# 🚀 Real-Time Camera & Map Tracking

This project is a **React-based real-time camera and map tracking dashboard** that combines live video streams, a dynamic map view (via Leaflet), and an interactive drone simulation.  
It demonstrates a modern frontend architecture with **video control features**, **map route visualization**, and **PiP (Picture-in-Picture)** camera integration.

---

## 🧠 Overview

The app allows users to:
- View **live camera streams** with playback controls (Play/Pause, Zoom, Fullscreen)
- See **real-time drone movement** on a map
- **Draw custom routes** interactively on the map
- Track **route progress** with visual polylines
- Manage **multiple camera feeds** and a **PiP view**
- Reset routes and toggle drone flight dynamically

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | **React 18+**, **Vite** |
| Maps | **Leaflet** + **react-leaflet** |
| Icons | **lucide-react** |
| Animations | **Framer Motion** (optional) |
| Styling | CSS / Tailwind / custom styles |

---

## 🧩 Features

### 🎥 Camera System
- Multiple sample video streams
- **Play / Pause / Zoom / Fullscreen** controls
- Live/Paused state indicator
- Responsive layout for camera feeds

### 🗺️ Map System
- Built with **Leaflet + React Leaflet**
- Real-time moving **drone marker**
- **Draw routes manually** on map (click-to-add points)
- Visual **route polyline** with animations
- Drone simulation follows a smooth figure-8 pattern
- Status display: *Idle*, *Drawing Mode*, *Following Route*

### ✨ PiP Mode
- Floating, draggable video preview (can be toggled on/off)

---

## 🧠 How It Works

1. The app renders multiple camera cards (using sample video URLs).
2. The **MapView** uses Leaflet to visualize a live map centered on a moving drone.
3. The drone position is updated every few milliseconds to simulate flight.
4. Users can **draw routes** on the map that the drone can follow.
5. The **CameraCard** includes built-in controls for interaction:
   - ▶️ Play/Pause
   - 🔍 Zoom In/Out
   - ⛶ Fullscreen

---

## 📂 Project Structure


src/
├── components/
│ ├── CameraCard.jsx # Individual camera card with controls
│ ├── MapView.jsx # Leaflet map with drone + route logic
│ ├── DroneMarker.js # Custom drone/ship marker icon
│ ├── MapUtilities.jsx # All functions related to MapView
│ └── PiP.jsx # Picture-in-Picture floating video window
├── App.jsx # Main app layout and logic
├── App.css # Core styling
└── main.jsx # React entry file


## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/Badrish96/realtime-camera-map-pip.git
cd realtime-camera-map-tracking

npm install

npm run dev



