import { useState, useEffect } from "react";
import { Navigation, Video, X, Sun, Moon } from "lucide-react";
import CameraCard from "./components/CameraCard";
import MapView from "./components/MapView";
import PiP from "./components/PiP";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const sampleStreams = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  ];

  const [route, setRoute] = useState([]);
  const [showPiP, setShowPiP] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [mapKey, setMapKey] = useState(0); // Add key to force re-render

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleRouteUpdate = (point) => {
    setRoute((r) => [...r, point]);
  };

  const resetRoute = () => {
    setRoute([]);
    setMapKey(prev => prev + 1); // Force MapView to remount
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <Navigation size={20} />
            <h5 className="mb-0">Real-time Camera & Map Tracking</h5>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button 
              className="btn btn-outline-primary btn-sm" 
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon size={14} className="me-1" /> : <Sun size={14} className="me-1" />}
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => setShowPiP(!showPiP)}>
              <Video size={14} className="me-1" />
              {showPiP ? "Hide PiP" : "Show PiP"}
            </button>
            <button className="btn btn-danger btn-sm" onClick={resetRoute}>
              <X size={14} className="me-1" />
              Reset Route
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content-wrapper">
        {/* Cameras Section */}
        <section className="cameras-section">
          {sampleStreams.map((stream, idx) => (
            <CameraCard 
              key={idx} 
              src={stream} 
              title={`Camera ${idx + 1}`}
              index={idx}
            />
          ))}
        </section>

        {/* Map Section */}
        <div className="map-section">
          <MapView 
            key={mapKey} 
            route={route} 
            onRouteUpdate={handleRouteUpdate} 
          />
        </div>
      </main>

      {showPiP && (
        <PiP src={sampleStreams[0]} onClose={() => setShowPiP(false)} />
      )}
    </div>
  );
}

export default App;