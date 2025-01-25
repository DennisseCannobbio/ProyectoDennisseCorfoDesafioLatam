const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// * REGISTER
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // * Verify user
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'The email already exists on the database.' });
        }

        // * Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // * Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // 
        return res.status(201).json({
            message: 'User registered!.',
            user: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error.' });
    }
};

// * LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // * Verify User
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Incorrect credentials.' });
        }

        // * Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect credentials.' });
        }

        // *  Generate JWT 
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error: error });
    }
};

module.exports = {
    register,
    login
};
