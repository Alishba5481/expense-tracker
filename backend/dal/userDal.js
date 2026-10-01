const { query } = require('./database');

async function createUser(userData) {
    const sql = `
        INSERT INTO users (first_name, last_name, email, age, username, password)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.age,
        userData.username,
        userData.password
    ];
    
    const result = await query(sql, params);
    return result.insertId;
}

async function getUserByUsername(username) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    const result = await query(sql, [username]);
    return result[0];
}

async function getUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const result = await query(sql, [email]);
    return result[0];
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail
};
