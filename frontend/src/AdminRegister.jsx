import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminRegister.css';

const AdminRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Direct check for testing
      if (firstName.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
        alert("Admin Registered Successfully!");
        navigate('/admin-login');
      } else {
        alert("Invalid! Please fill in all fields correctly.");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server connection failed or invalid data!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="19" y1="8" x2="19" y2="14"></line>
            <line x1="22" y1="11" x2="16" y2="11"></line>
          </svg>
        </div>
        
        <h2 className="auth-title">Admin Register</h2>
        <p className="auth-subtitle">Please enter admin credentials to register</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="auth-input" 
              required
            />
          </div>

          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit" className="auth-btn">
            Register Admin
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="/admin-login">Log in here</a>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;