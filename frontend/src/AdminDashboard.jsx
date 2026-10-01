import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/all-expenses');
      const data = await res.json();
      if (res.ok) {
        setExpenses(data);
      } else {
        setError(data.error || 'Data load karne me error aaya');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection fail ho gaya');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark-theme-wrapper dash-padding">
      <div className="dark-theme-card dash-card-width">
        
        {/* Header Section */}
        <div className="dash-top-header">
          <div className="header-left">
            <div className="card-top-icon header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00c6ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div>
              <h2 className="card-main-title left-align">
                Admin <span className="highlight-text">Dashboard</span>
              </h2>
              <p className="card-sub-title left-align">All registered users and expenses overview</p>
            </div>
          </div>

          <button onClick={() => navigate('/admin-register')} className="glow-submit-btn nav-action-btn">
            + Register New Admin
          </button>
        </div>

        <div className="card-divider"></div>

        {/* Content & Table Section */}
        {loading && <div className="dark-status-msg">Loading expense records...</div>}
        {error && <div className="dark-status-msg error">{error}</div>}

        {!loading && !error && (
          <div className="dark-table-container">
            {expenses.length === 0 ? (
              <div className="dark-status-msg">No expenses record found.</div>
            ) : (
              <table className="dash-dark-table">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>User Detail</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td>#{item.id || idx + 1}</td>
                      <td>{item.email || item.userName || `User #${item.userId || 'N/A'}`}</td>
                      <td>{item.title || item.description || 'N/A'}</td>
                      <td><span className="dash-cyan-pill">{item.category || 'General'}</span></td>
                      <td className="amount-highlight">Rs. {item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;