const express = require('express');
const router = express.Router();
const adminDal = require('../dal/adminDal');

// 1. Admin Register Route
router.post('/register', async (req, res) => {
    const { firstName, email, password, adminSecretKey } = req.body;

    
    if (adminSecretKey !== "ADMIN_SECRET_123") {
        return res.status(403).json({ error: "Ghalat Admin Secret Key!" });
    }

    try {
        await adminDal.registerAdmin({ firstName, email, password });
        res.status(201).json({ message: "Admin Successfully Register ho gaya!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Admin Login Route 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminDal.loginAdmin({ email, password });
        
        if (!admin) {
            return res.status(401).json({ error: "Ghalat Email ya Password!" });
        }

        res.status(200).json({ message: "Login Successful!", admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. All Users Expenses Route
router.get('/all-expenses', async (req, res) => {
    try {
        const data = await adminDal.getAllUsersExpenses();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;