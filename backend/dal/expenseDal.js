const { getPool } = require('./database'); // Ya aapka pool connection object

async function addExpense({ userId, title, amount, type, category }) {
    const pool = getPool();
    
    const query = `
        INSERT INTO expenses (user_id, title, amount, type, category) 
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.execute(query, [
            userId || 1, 
            title, 
            amount, 
            type, 
            category
        ]);
        console.log("MySQL Entry Created Successfully! ID:", result.insertId);
        return result.insertId;
    } catch (error) {
        console.error("MySQL Insert Failed Error:", error.message);
        throw error;
    }
}

async function getExpensesByUserId(userId) {
    const pool = getPool();
    const query = `SELECT * FROM expenses WHERE user_id = ? ORDER BY id DESC`;
    const [rows] = await pool.execute(query, [userId || 1]);
    return rows;
}

async function deleteExpense(id, userId) {
    const pool = getPool();
    const query = `DELETE FROM expenses WHERE id = ? AND user_id = ?`;
    await pool.execute(query, [id, userId || 1]);
}

module.exports = {
    addExpense,
    getExpensesByUserId,
    deleteExpense
};