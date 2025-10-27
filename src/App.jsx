import { useState, useEffect } from "react";
import CameraCard from "./pages/CameraCard/CameraCard";
import MapView from "./pages/MapView/MapView";
import PiP from "./components/PiP/PiP";
import Header from "./components/Header";
import "./App.css";

// Cookie utility functions
const setCookie = (name, value, days = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

function App() {
  const cameras = [
    {
      id: 1,
      title: "Camera 1",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailCount: 10
    },
    {
      id: 2,
      title: "Camera 2", 
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailCount: 7
    }
  ];

  const [route, setRoute] = useState([]);
  const [mapKey, setMapKey] = useState(0);
  
  // Initialize theme from cookie or default to dark
  const [theme, setTheme] = useState(() => {
    const savedTheme = getCookie('theme');
    return savedTheme || 'dark';
  });
  
  // Initialize showPiP from cookie or default to true
  const [showPiP, setShowPiP] = useState(() => {
    const savedPiP = getCookie('showPiP');
    return savedPiP === 'false' ? false : true;
  });

  // Update theme attribute and save to cookie
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setCookie('theme', theme);
  }, [theme]);

  // Save PiP preference to cookie
  useEffect(() => {
    setCookie('showPiP', showPiP.toString());
  }, [showPiP]);

  const handleRouteUpdate = (point) => {
    setRoute((r) => [...r, point]);
  };

  const resetRoute = () => {
    setRoute([]);
    setMapKey((prev) => prev + 1);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const togglePiP = () => {
    setShowPiP(!showPiP);
  };

  return (
    <div>
      {/* Header */}
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        showPiP={showPiP}
        togglePiP={togglePiP}
        resetRoute={resetRoute}
      />

      <div className="container-fluid">
        {/* Main Content */}
        <main className="row app-main">
          {/* Cameras Section */}
          <section className="col-lg-4 cameras-section">
            {cameras.map((camera, index) => (
              <CameraCard
                key={camera.id}
                src={camera.videoUrl}
                thumbnailCount={camera.thumbnailCount}
                title={camera.title}
                index={index}
              />
            ))}
          </section>

          {/* Map Section */}
          <div className="col-lg-8">
            <MapView
              key={mapKey}
              route={route}
              onRouteUpdate={handleRouteUpdate}
            />
          </div>
        </main>
      </div>

      {showPiP && (
        <PiP 
          src={cameras[0].videoUrl} 
          onClose={() => setShowPiP(false)} 
          index={0}  
          thumbnailCount={cameras[0].thumbnailCount} 
        />
      )}
    </div>
  );
}

export default App;