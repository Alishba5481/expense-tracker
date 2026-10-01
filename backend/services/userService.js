const userDal = require('../dal/userDal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // 1. JWT package import kiya

// Pehle se majood Register function
async function registerUser(userData) {
    const { firstName, lastName, email, age, username, password } = userData;

    if (!firstName || !lastName || !email || !age || !username || !password) {
        const error = new Error('All fields are required');
        error.status = 400;
        throw error;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const error = new Error('Invalid email format');
        error.status = 400;
        throw error;
    }

    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
        const error = new Error('Age must be a number between 1 and 150');
        error.status = 400;
        throw error;
    }

    const existingUsername = await userDal.getUserByUsername(username);
    if (existingUsername) {
        const error = new Error('Username already exists');
        error.status = 409;
        throw error;
    }

    const existingEmail = await userDal.getUserByEmail(email);
    if (existingEmail) {
        const error = new Error('Email already exists');
        error.status = 409;
        throw error;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userToCreate = {
        firstName,
        lastName,
        email,
        age: ageNum,
        username,
        password: hashedPassword
    };
    
    const insertId = await userDal.createUser(userToCreate);
    
    return {
        message: 'User registered successfully',
        userId: insertId
    };
}

// 2. Naya Login function jo humne add kiya hai
async function loginUser(credentials) {
    const { username, password } = credentials;

    if (!username || !password) {
        const error = new Error('Username and password are required');
        error.status = 400;
        throw error;
    }

    const user = await userDal.getUserByUsername(username);
    if (!user) {
        const error = new Error('Invalid username or password');
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid username or password');
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '1d' }
    );

    return {
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            username: user.username
        }
    };
}

// 3. Dono functions export ho rahe hain
module.exports = {
    registerUser,
    loginUser
};