import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() !== '' && password.trim() !== '') {
      alert("Login Successfully!");
      navigate('/admin'); 
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        
        <h2 className="auth-title">Admin Login</h2>
        <p className="auth-subtitle">Please enter admin credentials to log in</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Admin Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input" 
              required
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input" 
              required
            />
          </div>

          <div className="auth-options">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-btn">
            Log In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an admin account? <a href="/admin-register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;