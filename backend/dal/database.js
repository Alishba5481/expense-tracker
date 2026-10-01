const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

async function initializeDatabase() {
    try {
        // Create connection without database to create it if it doesn't exist
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        });
        
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`Database '${process.env.DB_NAME}' checked/created successfully.`);
        await connection.end();

        // Create pool with database
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        
        await initializeTables();
        console.log('Database initialization completed.');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

async function initializeTables() {
    try {
        // 1. Users Table
        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                age INT NOT NULL,
                username VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createUsersTableQuery);
        console.log('Users table checked/created successfully.');

        // 2. Expenses Table
        const createExpensesTableQuery = `
            CREATE TABLE IF NOT EXISTS expenses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(150) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                type ENUM('income', 'expense') NOT NULL,
                category VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        await pool.query(createExpensesTableQuery);
        console.log('Expenses table checked/created successfully.');

        // 3. Admins Table 
        const createAdminsTableQuery = `
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createAdminsTableQuery);
        console.log('Admins table checked/created successfully.');

    } catch (error) {
        console.error('Error creating tables:', error);
        throw error;
    }
}

function getPool() {
    if (!pool) {
        throw new Error('Database pool has not been initialized. Call initializeDatabase first.');
    }
    return pool;
}

async function query(sql, params) {
    const dbPool = getPool();
    const [results] = await dbPool.execute(sql, params);
    return results;
}

module.exports = {
    initializeDatabase,
    getPool,
    query
};