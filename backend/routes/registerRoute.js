const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, age, username, password } = req.body;
        
        const result = await userService.registerUser({
            firstName,
            lastName,
            email,
            age,
            username,
            password
        });
        
        res.status(201).json(result);
    } catch (error) {
        console.error('Registration error:', error.message);
        
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        

        const result = await userService.loginUser({ username, password });
        
    
        res.status(200).json(result);
    } catch (error) {
        console.error('Login error:', error.message);
        
     
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        
    
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;