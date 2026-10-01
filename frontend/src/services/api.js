const API_BASE_URL = 'http://localhost:5000/api';

// 1. REGISTER USER
export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Server se connect nahi ho paa raha. Backend server check karein.');
    }
    throw error;
  }
};

// 2. LOGIN USER
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Login failed');
    }

    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Server se connect nahi ho paa raha. Backend server check karein.');
    }
    throw error;
  }
};

// 3. ADD EXPENSE (MySQL Database me Save Karne ke Liye)
export const addExpenseAPI = async (expenseData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(expenseData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Expense save nahi ho saka.');
    }

    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Server disconnect hai. Backend server check karein.');
    }
    throw error;
  }
};

// 4. GET ALL EXPENSES (MySQL Database se Read karne ke Liye)
export const getExpensesAPI = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Expenses load nahi ho sakay.');
    }

    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Server disconnect hai. Backend server check karein.');
    }
    throw error;
  }
};