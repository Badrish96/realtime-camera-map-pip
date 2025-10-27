import { useState, useEffect, useRef } from "react";
import { X, Play, Maximize2 } from "lucide-react";
import "./PiP.css";
const thumbnails = import.meta.glob('../../assets/images/*.png', { eager: true });

function PiP({ src, onClose, index, thumbnailCount }) {
  const [position, setPosition] = useState({
    x: window.innerWidth - 350,
    y: window.innerHeight - 300,
  });
  const [size, setSize] = useState({ width: 320, height: 220 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [currentThumbnail, setCurrentThumbnail] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  // Cycle through thumbnails to create animation effect
  useEffect(() => {
    if (!showVideo && thumbnailCount > 1) {
      const interval = setInterval(() => {
        setCurrentThumbnail((prev) => (prev % thumbnailCount) + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showVideo, thumbnailCount]);

  // Get thumbnail path - same logic as CameraCard
  const getThumbnailPath = () => {
    const videoNumber = index + 1; 
    const imageName = `video${videoNumber}-thumbnail${currentThumbnail}.png`;

    const match = Object.entries(thumbnails).find(([path]) =>
      path.includes(imageName)
    );

    return match ? match[1].default : "";
  };

  const handleVideoClick = () => {
    if (!showVideo) {
      setShowVideo(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 100);
    }
  };

  const handleMouseDownDrag = (e) => {
    if (e.target instanceof HTMLVideoElement) return;
    if (e.target.closest('.pip-close-btn') || e.target.closest('.pip-resize-handle')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseDownResize = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: Math.max(
            0,
            Math.min(e.clientX - dragOffset.x, window.innerWidth - size.width)
          ),
          y: Math.max(
            0,
            Math.min(e.clientY - dragOffset.y, window.innerHeight - size.height)
          ),
        });
      }
      if (isResizing) {
        const newWidth = Math.max(
          250,
          Math.min(600, resizeStart.width + (e.clientX - resizeStart.x))
        );
        const newHeight = Math.max(
          180,
          Math.min(450, resizeStart.height + (e.clientY - resizeStart.y))
        );
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, size, resizeStart]);

  return (
    <div className="pip-container d-none d-lg-block" style={{ left: `${position.x}px`, top: `${position.y}px`, width: `${size.width}px` }}>
      <div className="pip-card">
        {/* Header */}
        <div className="pip-header" onMouseDown={handleMouseDownDrag}>
          <div className="d-flex align-items-center gap-2">
            <Maximize2 size={16} className="pip-icon" />
            <span className="pip-title">Picture in Picture</span>
          </div>
          <button className="pip-close-btn" onClick={onClose} title="Close PiP">
            <X size={18} />
          </button>
        </div>

        {/* Video Content */}
        <div className="pip-body">
          <div className="pip-video-wrapper" onClick={handleVideoClick} style={{ height: `${size.height}px` }}>
            {!showVideo ? (
              <>
                <img
                  src={getThumbnailPath()}
                  alt="Camera feed"
                  className="pip-thumbnail"
                />
                <div className="pip-play-overlay">
                  <div className="pip-play-button">
                    <Play size={28} className="pip-play-icon" />
                  </div>
                </div>
              </>
            ) : (
              <video
                ref={videoRef}
                src={src}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="pip-video"
              />
            )}
          </div>

          {/* Resize handle */}
          <div className="pip-resize-handle" onMouseDown={handleMouseDownResize} title="Resize" />
        </div>
      </div>
    </div>
  );
}

export default PiP;