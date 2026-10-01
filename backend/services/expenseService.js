const expenseDal = require('../dal/expenseDal');

async function addExpense(expenseData) {
    // Agar userId na aaye to automatically 1 set ho jaye
    const userId = expenseData.userId || 1;
    const { title, amount, type, category } = expenseData;

    if (!title || !amount || !type || !category) {
        const error = new Error('Title, amount, type and category are required');
        error.status = 400;
        throw error;
    }

    const insertId = await expenseDal.addExpense({
        userId,
        title,
        amount: Number(amount),
        type,
        category
    });

    return { message: 'Expense added successfully', expenseId: insertId };
}

async function getUserExpenses(userId) {
    const finalUserId = userId || 1;
    return await expenseDal.getExpensesByUserId(finalUserId);
}

async function deleteExpense(id, userId) {
    const finalUserId = userId || 1;
    await expenseDal.deleteExpense(id, finalUserId);
    return { message: 'Expense deleted successfully' };
}

module.exports = {
    addExpense,
    getUserExpenses,
    deleteExpense
};