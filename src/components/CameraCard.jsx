import { useState, useEffect, useRef } from "react";
import { Play, Pause, Maximize2, Minimize2, ZoomIn, ZoomOut, RefreshCw, Video, X } from "lucide-react";

function CameraCard({ src, title, index }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
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
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 1));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      className={`card shadow-sm border-1 camera-card ${isFullscreen ? 'fullscreen-card' : 'gap-1'}`} 
      ref={containerRef}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <Video size={18} />
          <span className="fw-semibold">{title}</span>
        </div>
        <span className={`badge ${isPlaying ? 'bg-success' : 'bg-secondary'}`}>
          {isPlaying ? 'LIVE' : 'PAUSED'}
        </span>
      </div>
      
      <div className="card-body p-3">
        <div className="video-container" style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          borderRadius: '0.375rem', 
          backgroundColor: '#000',
          height: isFullscreen ? 'calc(100vh - 180px)' : '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <video
            ref={videoRef}
            src={src}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s ease',
              display: 'block'
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            loop
            muted
          />
          
          {zoom > 1 && (
            <div className="zoom-overlay">
              {(zoom * 100).toFixed(0)}%
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <div className="btn-group btn-group-sm" role="group">
              <button 
                className={`btn ${isPlaying ? 'btn-warning' : 'btn-success'}`}
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <>
                    <Pause size={16} className="me-1" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play size={16} className="me-1" />
                    <span>Play</span>
                  </>
                )}
              </button>
              <button 
                className="btn btn-primary" 
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 size={16} className="me-1" />
                    <span>Exit</span>
                  </>
                ) : (
                  <>
                    <Maximize2 size={16} className="me-1" />
                    <span>Fullscreen</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="btn-group btn-group-sm" role="group">
              <button 
                className="btn btn-outline-secondary" 
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button 
                className="btn btn-outline-secondary" 
                onClick={resetZoom}
                disabled={zoom === 1}
                title="Reset Zoom"
              >
                <RefreshCw size={16} />
              </button>
              <button 
                className="btn btn-outline-secondary" 
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </div>
          
          <div className="mt-2 text-center text-muted small">
            Zoom Level: <strong>{(zoom * 100).toFixed(0)}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CameraCard;