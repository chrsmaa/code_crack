const bcrypt = require('bcryptjs');
const User = require('../models/userModel')

// Register
exports.registerUser = async (req, res) => {
    const { studentNumber, username, email, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hashSync(password, 10);
        // Save the user
        const newUser = new User({ studentNumber, username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({ message: 'Username/Student Number/Email already exists.' });
        } else {
            res.status(500).json({ message: 'Error registering user.', error: err });
        }
    }
}

// Login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Find the user
        const user = await User.findOne({ username }); // Exclude the password field
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check the password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Send user information except the password
        res.status(200).json({
            message: 'Login successful!',
            user: {
                _id: user._id,
                username: user.username,
                studentNumber: user.studentNumber,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in.', error: err });
    }
};
