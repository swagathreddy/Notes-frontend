import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          Home
        </Link>
        
        {/* Hamburger icon for mobile */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
        </div>
        
        {/* Navigation for desktop and mobile */}
        <nav className={`header-nav ${menuOpen ? 'active' : ''}`}>
          {isLoggedIn ? (
            <>
              <Link to="/home" className="nav-button primary" onClick={() => setMenuOpen(false)}>
                Notes
              </Link>
              <button onClick={() => {handleLogout(); setMenuOpen(false);}} className="nav-button danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button primary" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="nav-button success" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;