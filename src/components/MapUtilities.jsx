import { useEffect } from "react";
import { useMapEvents, useMap } from "react-leaflet";

export function MapResizer() {
  const map = useMap();
  
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => map.invalidateSize(), 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [map]);
  
  return null;
}

export function MapFollower({ position, shouldFollow }) {
  const map = useMap();
  
  useEffect(() => {
    if (shouldFollow) {
      map.setView(position, map.getZoom(), { animate: true, duration: 1 });
    }
  }, [position, map, shouldFollow]);
  
  return null;
}

export function DrawHandler({ isDrawing, onAddPoint }) {
  useMapEvents({
    click(e) {
      if (isDrawing) {
        onAddPoint([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
}