// adminDal.js
const { getPool } = require('./database');

// 1. Admin Register function
async function registerAdmin({ firstName, email, password }) {
    const pool = getPool();
    const query = `INSERT INTO admins (first_name, email, password) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(query, [firstName, email, password]);
    return result.insertId;
}

// 2. Admin Login function 
async function loginAdmin({ email, password }) {
    const pool = getPool();
    const query = `SELECT * FROM admins WHERE email = ? AND password = ?`;
    const [rows] = await pool.execute(query, [email, password]);
    return rows[0]; 
}

// 3. All Users Expenses function
async function getAllUsersExpenses() {
    const pool = getPool();
    const query = `
        SELECT 
            users.id AS userId, 
            users.first_name AS userName, 
            users.email, 
            expenses.id AS expenseId, 
            expenses.title, 
            expenses.amount, 
            expenses.type, 
            expenses.category
        FROM expenses
        INNER JOIN users ON users.id = expenses.user_id
        ORDER BY expenses.id DESC;
    `;
    const [rows] = await pool.execute(query);
    return rows;
}

module.exports = { registerAdmin, loginAdmin, getAllUsersExpenses };