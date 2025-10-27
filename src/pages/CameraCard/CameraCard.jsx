import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Video,
  Circle,
} from "lucide-react";
import "./cameraCard.css";

function CameraCard({ src, title, index, thumbnailCount }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [currentThumbnail, setCurrentThumbnail] = useState(1);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const thumbnails = import.meta.glob('../../assets/images/*.png', { eager: true });

  // Cycle through thumbnails to create animation effect
  useEffect(() => {
    if (!showVideo && thumbnailCount > 1) {
      const interval = setInterval(() => {
        setCurrentThumbnail((prev) => (prev % thumbnailCount) + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showVideo, thumbnailCount]);

  const togglePlay = () => {
    if (!showVideo) {
      setShowVideo(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const getThumbnailPath = () => {
    const videoNumber = index + 1;
    const imageName = `video${videoNumber}-thumbnail${currentThumbnail}.png`;
    const match = Object.entries(thumbnails).find(([path]) =>
      path.includes(imageName)
    );
    return match ? match[1].default : "";
  };

  return (
    <div
      className={`card border-0 shadow-lg camera-card mb-4 ${
        isFullscreen ? "fullscreen-card" : ""
      }`}
      ref={containerRef}
    >
      {/* Enhanced Header */}
      <div className="camera-card-header-gradient">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div className="camera-icon-badge">
              <Video size={18} className="text-white" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold camera-title">{title}</h6>
              <small className="d-flex align-items-center gap-1 camera-status">
                <Circle size={8} className={isPlaying ? "text-success" : "text-warning"} fill="currentColor" />
                {isPlaying ? "Live Stream" : "Ready"}
              </small>
            </div>
          </div>
          <span className={`badge ${isPlaying ? "bg-success" : "bg-warning text-dark"} camera-status-badge`}>
            {isPlaying ? "● LIVE" : "● PAUSED"}
          </span>
        </div>
      </div>

      {/* Video Container */}
      <div className="card-body p-4">
        <div className="camera-video-wrapper" onClick={handleVideoClick}>
          {!showVideo ? (
            <>
              <img
                src={getThumbnailPath()}
                alt={title}
                className="camera-thumbnail-img"
              />
              <div className="camera-play-overlay">
                <div className="camera-play-button">
                  <Play size={36} className="text-primary camera-play-icon" />
                </div>
              </div>
            </>
          ) : (
            <>
              <video
                ref={videoRef}
                src={src}
                className="camera-video-element"
                style={{ transform: `scale(${zoom})` }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                loop
                muted
                playsInline
              />
              {zoom > 1 && (
                <div className="camera-zoom-indicator">
                  {(zoom * 100).toFixed(0)}%
                </div>
              )}
            </>
          )}
        </div>

        {/* Enhanced Controls */}
        <div className="camera-controls-section">
          <div className="row g-3 mb-3">
            {/* Playback Controls */}
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="camera-button-group">
                <button
                  className={`btn camera-control-btn ${
                    isPlaying ? "btn-warning" : "btn-success"
                  }`}
                  onClick={togglePlay}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={18} />
                      <span className="d-none d-md-inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      <span className="d-none d-md-inline">Play</span>
                    </>
                  )}
                </button>
                <button
                  className="btn btn-primary camera-control-btn"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 size={18} />
                      <span className="d-none d-md-inline">Exit</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 size={18} />
                      <span className="d-none d-md-inline">Full</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="col-12 col-lg-6">
              <div className="btn-group camera-zoom-group" role="group">
                <button
                  className="btn btn-outline-secondary camera-zoom-btn"
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  title="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  className="btn btn-outline-secondary camera-zoom-btn"
                  onClick={resetZoom}
                  disabled={zoom === 1}
                  title="Reset Zoom"
                >
                  <RefreshCw size={18} />
                </button>
                <button
                  className="btn btn-outline-secondary camera-zoom-btn"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  title="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Zoom Level Indicator */}
          <div className="camera-zoom-display">
            <small>
              Zoom Level: <strong className="text-primary">{(zoom * 100).toFixed(0)}%</strong>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CameraCard;