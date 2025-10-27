🚀 Real-Time Camera & Map Tracking System
A React-based real-time camera and map tracking dashboard that combines live video streams, dynamic map visualization (via Leaflet), and interactive object tracking simulation. This project demonstrates modern frontend architecture with video control features, map route visualization, Picture-in-Picture (PiP) support, and dark/light theme switching.

🧠 Overview
The app allows users to:

View multiple camera streams with full playback controls (Play/Pause, Zoom, Fullscreen)
Track real-time object movement on an interactive map
Visualize routes with animated polylines and tracking statistics
Use Picture-in-Picture (PiP) mode for floating camera preview
Draw and manage routes on the map
Switch between dark and light themes
Experience responsive design across all devices


⚙️ Tech Stack
LayerTechnologyFrontendReact 18+, ViteStylingBootstrap 5.3, Custom CSSMapsLeaflet + react-leafletIconslucide-reactPiP/Draggablereact-rndVideoHTML5 Video API

🧩 Features
🎥 Camera System

Two or more camera feeds with sample video streams
Play / Pause controls with visual indicators
Zoom In/Out (up to 300%) with reset functionality
Fullscreen mode with persistent controls
Live/Paused status badges for each camera
Real-time zoom percentage display
Responsive card layout with hover effects

🗺️ Map System

Built with Leaflet + React Leaflet
Real-time tracking with simulated object movement (updates every 3 seconds)
Automatic route drawing as object moves
Visual route polyline with dashed blue lines
Auto-follow camera that smoothly tracks the moving marker
Route statistics showing total points tracked
Custom animated marker with pulse effect
Interactive zoom and pan controls

✨ PiP (Picture-in-Picture) Mode

Floating, draggable video window that overlays the map
Resizable with minimum/maximum dimensions
Play/Pause overlay on hover
Toggle on/off from header
Maintains map interactivity while active
Professional styling with border and shadow effects

🎨 Theme System

Dark and Light modes with smooth transitions
Persistent theme across all components
Theme toggle button in header
Proper contrast and readability in both modes
Custom CSS variables for easy customization


📋 Requirements Met
✅ Part 1: Real-time Camera Feed Display

Two live camera feeds (using sample video streams)
Play/Pause, Zoom, and Fullscreen controls
Responsive and visually clean layout

✅ Part 2: Map with Tracking

Interactive map with simulated moving object
Automatic route drawing every few seconds
Visual route visualization with polylines

✅ Part 3: Picture-in-Picture (PiP)

Draggable and resizable PiP window
Map interactions work while PiP is active
Clean and intuitive interface


🧠 How It Works

Camera Feeds: The app renders multiple camera cards using sample video URLs from Google's video bucket. Each card has full playback controls.
Map Tracking: The MapView component uses Leaflet to display an interactive map. A simulated object (marker) moves automatically every 3 seconds, creating a tracking route.
Route Visualization: As the object moves, its position is added to a route array, which is displayed as a blue dashed polyline on the map.
PiP Mode: Users can enable a floating video window that displays Camera 1. This window can be dragged and resized without affecting map interactions.
Theme Switching: The entire application supports dark and light themes, controlled via a toggle button in the header.


📂 Project Structure
src/
├── components/
│   ├── CameraCard.jsx      # Individual camera card with controls
│   ├── MapView.jsx          # Leaflet map with tracking logic
│   └── PiP.jsx              # Picture-in-Picture floating window
├── App.jsx                  # Main app layout and state management
├── App.css                  # Core styling and theme variables
└── main.jsx                 # React entry file

🚀 Getting Started
Prerequisites

Node.js 16+ and npm/yarn installed
Modern web browser with JavaScript enabled

1. Clone Repository
bashgit clone https://github.com/Badrish96/realtime-camera-map-pip.git
cd realtime-camera-map-tracking
2. Install Dependencies
bashnpm install
3. Run Development Server
bashnpm run dev
The app will be available at http://localhost:5173
4. Build for Production
bashnpm run build

📦 Dependencies
json{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "bootstrap": "^5.3.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "react-rnd": "^10.4.1",
  "lucide-react": "^0.263.1"
}

🎯 Implementation Highlights
Live Camera Feeds
The application uses high-quality video streams from Google's sample video bucket as placeholders for live camera feeds. These videos loop continuously to simulate live feeds.
Why sample videos instead of actual live streams?

Public live RTSP/HLS streams are often unreliable or require authentication
The focus is on UI/UX, interactivity, and functionality demonstration
The video player is fully capable of handling actual live streams (HLS/DASH) with minimal modification

To use actual live streams:
Simply replace the URLs in the sampleStreams array with HLS/DASH stream URLs. For HLS streams, you may need to add the hls.js library.
Design Choices

Bootstrap for consistency: Ensures professional, responsive design across all screen sizes
React hooks for state management: Clean, modern approach to component logic
Leaflet for mapping: Lightweight, open-source mapping library with excellent React integration
CSS variables for theming: Easy theme switching without JavaScript overhead
Component-based architecture: Reusable, maintainable code structure


🌐 Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)


📱 Responsive Design
The application is fully responsive with breakpoints for:

Desktop (>1024px): Side-by-side camera and map layout
Tablet (768px-1024px): Stacked layout with optimized spacing
Mobile (<768px): Single column with horizontal camera scroll


🔧 Customization
Adding More Cameras
javascriptconst sampleStreams = [
  "url1.mp4",
  "url2.mp4",
  "url3.mp4", // Add more URLs here
];
Adjusting Tracking Speed
In MapView.jsx, modify the interval:
javascriptsetInterval(() => {
  // Update position
}, 3000); // Change this value (in milliseconds)
Customizing Theme Colors
Edit CSS variables in App.css:
css:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1f2d;
  /* Add more custom colors */
}

🐛 Known Issues & Limitations

PiP window cannot be dragged outside browser viewport
Video streams require CORS-enabled servers
Fullscreen API may not work in some embedded contexts
Route data is not persisted (resets on page refresh)


🚀 Future Enhancements

 Add real HLS/RTSP stream support
 Implement route persistence with backend API
 Add multiple object tracking on map
 Include video recording/screenshot features
 Add geofencing and zone alerts
 Implement WebSocket for real-time updates
 Add camera grid view option
 Include map drawing tools (polygons, circles)


📄 License
This project is open source and available under the MIT License.

👨‍💻 Author
Badrish Kumar

GitHub: @Badrish96
Repository: realtime-camera-map-pip


🙏 Acknowledgments

Sample videos provided by Google's GTV Videos Bucket
Map tiles from OpenStreetMap contributors
Icons from Lucide React
UI components from Bootstrap 5


📞 Support
For issues, questions, or contributions:

Open an issue on GitHub Issues
Submit a pull request with improvements
Contact via GitHub profile


Built with ❤️ using React + Leaflet + Bootstrap
