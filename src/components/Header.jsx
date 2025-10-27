import { Navigation, Video, X, Sun, Moon, MapPin, Activity } from "lucide-react";

function Header({ theme, toggleTheme, showPiP, togglePiP, resetRoute }) {
  return (
    <nav className={`navbar navbar-expand-lg sticky-top shadow-sm ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid px-4">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center gap-2 fw-bold" href="#">
          <div className={`d-flex align-items-center justify-content-center rounded-circle ${theme === 'dark' ? 'bg-primary' : 'bg-primary'}`} style={{ width: '40px', height: '40px' }}>
            <Navigation size={20} className="text-white" />
          </div>
          <span className="d-none d-md-inline">
            Real-time Camera & Map Tracking
          </span>
          <span className="d-inline d-md-none">
            Camera Tracker
          </span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Status Badges */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center gap-2 px-3">
              <MapPin size={16} className="text-info" />
              <span className={`badge ${theme === 'dark' ? 'bg-info text-dark' : 'bg-info'}`}>
                Live Tracking
              </span>
            </li>
          </ul>

          {/* Action Buttons */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 align-items-center">
            {/* Theme Toggle Icon */}
            <li className="nav-item">
              <div
                onClick={toggleTheme}
                style={{ 
                  cursor: 'pointer',
                  fontSize: '20px',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-secondary" />
                ) : (
                  <Sun size={20} className="text-warning" />
                )}
              </div>
            </li>

            {/* PiP Toggle */}
            <li className="nav-item">
              <button
                className={`btn btn-sm d-flex align-items-center gap-2 ${showPiP ? 'btn-info text-white' : 'btn-outline-info'}`}
                onClick={togglePiP}
                title={showPiP ? 'Hide Picture-in-Picture' : 'Show Picture-in-Picture'}
                style={{ fontWeight: '500' }}
              >
                <Video size={16} />
                <span className="d-none d-lg-inline">
                  {showPiP ? 'Hide' : 'Show'} PiP
                </span>
              </button>
            </li>

            {/* Reset Route */}
            <li className="nav-item">
              <button
                className="btn btn-warning text-dark btn-sm d-flex align-items-center gap-2"
                onClick={resetRoute}
                title="Reset Route"
                style={{ fontWeight: '500' }}
              >
                <X size={16} />
                <span className="d-none d-lg-inline">Reset Route</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;