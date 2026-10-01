import { Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../services/api';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await registerUser(formData);
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        username: '',
        password: ''
      });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2>Create Account</h2>
          <p>Join our premium platform today</p>
        </div>

        {success && (
          <div className="alert success-alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Registration successful! Welcome aboard.</span>
          </div>
        )}

        {error && (
          <div className="alert error-alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="input-group">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder=" " />
              <label>First Name</label>
            </div>
            <div className="input-group">
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder=" " />
              <label>Last Name</label>
            </div>
          </div>

          <div className="input-group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder=" " />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input type="number" name="age" min="1" max="150" value={formData.age} onChange={handleChange} required placeholder=" " />
            <label>Age</label>
          </div>

          <div className="input-group">
            <input type="text" name="username" minLength="3" value={formData.username} onChange={handleChange} required placeholder=" " />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input type="password" name="password" minLength="6" value={formData.password} onChange={handleChange} required placeholder=" " />
            <label>Password</label>
          </div>

          <button type="submit" disabled={loading} className={`submit-btn ${loading ? 'loading' : ''}`}>
            {loading ? (
              <div className="spinner"></div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <div className="form-footer">
           <p>Already have an account? <Link to="/login" className="auth-link">Log in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
