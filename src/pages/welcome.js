import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import "../styles/welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  const handleStartNotes = () => {
    navigate('/home');
  };

  return (
    <div className="welcome-container">
      <Header />
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to Notes App</h1>
        <p className="welcome-subtitle">Your personal space for organizing thoughts and ideas</p>
        <button className="start-button" onClick={handleStartNotes}>Start Notes</button>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <p className="feature-text">Create and manage your notes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <p className="feature-text">Secure and private</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <p className="feature-text">Access from anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;