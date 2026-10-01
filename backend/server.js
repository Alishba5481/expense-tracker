const express = require('express');
const cors = require('cors');
require('dotenv').config();
const registerRoute = require('./routes/registerRoute');
const expenseRoute = require('./routes/expenseRoute');
const adminRoute = require('./routes/adminRoute'); // 1. Admin Route Import Kiya
const { initializeDatabase } = require('./dal/database');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

// Routes
app.use('/api', registerRoute);
app.use('/api/expenses', expenseRoute);
app.use('/api/admin', adminRoute); // 2. Admin Route Register Kiya

async function startServer() {
    try {
        await initializeDatabase();
        
        const PORT = process.env.SERVER_PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();