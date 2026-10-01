import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ title: '', amount: '', type: 'expense', category: 'Food' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    let userId = 1;

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        userId = parsedUser.id || parsedUser.userId || parsedUser._id || 1;
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
    
    fetchExpenses(userId);
  }, []);

  const fetchExpenses = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/expenses?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const totalIncome = expenses
    .filter(i => i.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const totalExpense = expenses
    .filter(i => i.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const balance = totalIncome - totalExpense;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;

    const currentUserId = user?.id || user?.userId || user?._id || 1;

    const payload = {
      userId: currentUserId,
      title: form.title,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category
    };

    try {
      
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setForm({ title: '', amount: '', type: 'expense', category: 'Food' });
       
        fetchExpenses(currentUserId);
      } else {
        console.error("Failed to save data to backend");
      }
    } catch (err) {
      console.error("Network error while adding expense:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Expense Tracker</h2>
        <div className="user-info">
          <span>Welcome, <strong>{user?.firstName || user?.first_name || 'User'}</strong></span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card balance-card">
          <h4>Total Balance</h4>
          <h3>${balance.toFixed(2)}</h3>
        </div>
        <div className="card income-card">
          <h4>Total Income</h4>
          <h3 className="income-text">+${totalIncome.toFixed(2)}</h3>
        </div>
        <div className="card expense-card">
          <h4>Total Expenses</h4>
          <h3 className="expense-text">-${totalExpense.toFixed(2)}</h3>
        </div>
      </div>

      <div className="dashboard-main">
        {/* Transaction Form */}
        <div className="glass-card form-card">
          <h3>Add Transaction</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Title" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                required 
              />
            </div>
            <div className="input-group">
              <input 
                type="number" 
                placeholder="Amount" 
                value={form.amount} 
                onChange={e => setForm({...form, amount: e.target.value})} 
                required 
              />
            </div>
            <div className="input-group-row">
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">Add Record</button>
          </form>
        </div>

        {/* Transactions List */}
        <div className="glass-card list-card">
          <h3>History</h3>
          <div className="transaction-list">
            {expenses.length === 0 ? (
              <p className="empty-text">No transactions added yet.</p>
            ) : (
              expenses.map((item, index) => (
                <div key={item.id || index} className={`transaction-item ${item.type}`}>
                  <div>
                    <p className="item-title">{item.title}</p>
                    <span className="item-category">{item.category}</span>
                  </div>
                  <span className="item-amount">{item.type === 'income' ? '+' : '-'}${item.amount}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;