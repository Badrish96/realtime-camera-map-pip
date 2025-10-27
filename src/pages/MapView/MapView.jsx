import { useEffect, useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Pencil, Trash2, Pause, Play, Crosshair } from "lucide-react";
import { createDroneIcon, createCustomIcon } from "../../components/DroneMarker";
import { MapResizer, MapFollower, DrawHandler } from "../../components/MapUtilities";
import "./mapView.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapView({ route, onRouteUpdate }) {
  const [position, setPosition] = useState([28.6139, 77.209]);
  const [dronePosition, setDronePosition] = useState([28.6139, 77.219]);
  const [isDroneActive, setIsDroneActive] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [manualRoute, setManualRoute] = useState([]);
  const [isFollowingRoute, setIsFollowingRoute] = useState(false);
  const [followDrone, setFollowDrone] = useState(false);
  const routeIndexRef = useRef(0);
  const onRouteUpdateRef = useRef(onRouteUpdate);
  const mapRef = useRef(null);

  useEffect(() => {
    onRouteUpdateRef.current = onRouteUpdate;
  }, [onRouteUpdate]);

  const clearRoute = useCallback(() => {
    setManualRoute([]);
    routeIndexRef.current = 0;
    setIsFollowingRoute(false);
  }, []);

  const addRoutePoint = useCallback((point) => {
    setManualRoute((prev) => [...prev, point]);
  }, []);

  const focusOnDrone = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.setView(dronePosition, 15, { animate: true, duration: 1 });
    }
  }, [dronePosition]);

  useEffect(() => {
    if (isDroneActive) {
      const interval = setInterval(() => {
        setDronePosition(([lat, lng]) => {
          const time = Date.now() / 3000;
          const radius = 0.02;
          const newPos = [
            28.6139 + Math.sin(time) * radius,
            77.209 + Math.cos(time * 1.5) * radius,
          ];
          
          if (followDrone && mapRef.current) {
            mapRef.current.setView(newPos, mapRef.current.getZoom());
          }
          
          return newPos;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isDroneActive, followDrone]);

  useEffect(() => {
    if (manualRoute.length > 1 && isFollowingRoute) {
      const interval = setInterval(() => {
        const currentIndex = routeIndexRef.current;
        const nextIndex = (currentIndex + 1) % manualRoute.length;

        setPosition(manualRoute[nextIndex]);
        if (onRouteUpdateRef.current) {
          onRouteUpdateRef.current(manualRoute[nextIndex]);
        }
        routeIndexRef.current = nextIndex;
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [manualRoute, isFollowingRoute]);

  useEffect(() => {
    if (manualRoute.length > 1 && !isFollowingRoute) {
      setIsFollowingRoute(true);
      setPosition(manualRoute[0]);
      routeIndexRef.current = 0;
    }
  }, [manualRoute]);

  return (
    <div className="map-section-wrapper">
      <div className="map-container-card">
        <MapContainer
          center={position}
          zoom={13}
          className="leaflet-map"
          zoomControl={false}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />
          <MapResizer />
          <MapFollower position={position} shouldFollow={!followDrone} />
          
          <Marker position={dronePosition} icon={createDroneIcon()}>
            <Popup>
              <div className="text-center">
                <strong>Drone Position</strong>
                <div className="small text-muted">
                  Lat: {dronePosition[0].toFixed(4)}<br/>
                  Lng: {dronePosition[1].toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
          <Circle 
            center={dronePosition} 
            radius={100}
            pathOptions={{ 
              color: '#dc2626', 
              fillColor: '#dc2626',
              fillOpacity: 0.1,
              weight: 2,
              dashArray: '5, 5'
            }} 
          />
          
          {manualRoute.length > 0 && manualRoute.map((point, idx) => (
            <Marker key={idx} position={point} icon={createCustomIcon('#3b82f6')}>
              <Popup>
                <div className="text-center">
                  <strong>Waypoint {idx + 1}</strong>
                  <div className="small text-muted">
                    Lat: {point[0].toFixed(4)}<br/>
                    Lng: {point[1].toFixed(4)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          {manualRoute.length > 1 && (
            <Polyline
              positions={manualRoute}
              pathOptions={{
                color: "#3b82f6",
                weight: 3,
                opacity: 0.7,
                dashArray: "10, 10",
              }}
            />
          )}
          <DrawHandler isDrawing={isDrawing} onAddPoint={addRoutePoint} />
        </MapContainer>

        {/* Status Bar */}
        <div className="map-status-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2">
                  <Navigation size={18} className="text-primary" />
                  <span className="fw-semibold">
                    {isDrawing ? "Drawing Mode - Click to add waypoints" : isFollowingRoute ? "Following Route" : "Idle"}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-md-end gap-3 mt-2 mt-md-0">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary px-3 py-2">{manualRoute.length}</span>
                    <span className="small">Waypoints</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="status-indicator" style={{
                      background: isDroneActive ? '#22c55e' : '#ef4444'
                    }}></div>
                    <span className="small">Drone {isDroneActive ? 'Active' : 'Paused'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="map-control-panel">
          <button
            className={`map-control-btn ${isDrawing ? 'active' : ''}`}
            onClick={() => setIsDrawing(!isDrawing)}
            title={isDrawing ? "Stop Drawing" : "Start Drawing Route"}
          >
            <Pencil size={18} />
          </button>
          <button 
            className="map-control-btn danger"
            onClick={clearRoute} 
            title="Clear Route"
            disabled={manualRoute.length === 0}
          >
            <Trash2 size={18} />
          </button>
          <button
            className={`map-control-btn success ${isDroneActive ? 'active' : ''}`}
            onClick={() => setIsDroneActive(!isDroneActive)}
            title={isDroneActive ? "Pause Drone" : "Start Drone"}
          >
            {isDroneActive ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            className="map-control-btn"
            onClick={focusOnDrone}
            title="Focus on Drone"
          >
            <Crosshair size={18} />
          </button>
          <button
            className={`map-control-btn info ${followDrone ? 'active' : ''}`}
            onClick={() => setFollowDrone(!followDrone)}
            title={followDrone ? "Stop Following" : "Follow Drone"}
          >
            <Navigation size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapView;