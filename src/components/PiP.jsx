import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

function PiP({ src, onClose }) {
  const [position, setPosition] = useState({ x: window.innerWidth - 330, y: window.innerHeight - 280 });
  const [size, setSize] = useState({ width: 300, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const videoRef = useRef(null);

  const handleMouseDownDrag = (e) => {
    if (e.target.tagName === 'VIDEO') return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseDownResize = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - size.width)),
          y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - size.height))
        });
      }
      if (isResizing) {
        const newWidth = Math.max(200, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(150, resizeStart.height + (e.clientY - resizeStart.y));
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, size, resizeStart]);

  return (
    <div 
      className="position-fixed"
      style={{ 
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        zIndex: 2000,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="camera-card">
        <div 
          className="camera-card-header d-flex justify-content-between align-items-center py-2"
          onMouseDown={handleMouseDownDrag}
        >
          <span className="small fw-semibold">Picture in Picture</span>
          <button className="btn btn-sm btn-link text-white p-0" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="card-body p-0" style={{ position: 'relative' }}>
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            className="w-100"
            style={{ height: `${size.height}px`, objectFit: 'cover' }}
          />
          {/* Resize handle */}
          <div
            onMouseDown={handleMouseDownResize}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '20px',
              height: '20px',
              cursor: 'nwse-resize',
              background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.3) 50%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PiP;