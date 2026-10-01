const express = require('express');
const router = express.Router();
const expenseService = require('../services/expenseService');

// Add New Expense
router.post('/', async (req, res) => {
    try {
        console.log("Incoming Data in Route:", req.body); // Terminal me log dekhein
        const result = await expenseService.addExpense(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Add Expense Route Error:', error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
});

// Get Expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await expenseService.getUserExpenses(req.query.userId || 1);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;