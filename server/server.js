const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./user'); // Import the User model

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/NurseryShop')
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

// Register API Route (POST) - Save Data
app.post('/register', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed', details: err });
    }
});

// Fetch Users API Route (GET) - Retrieve Data
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err });
    }
});

// Start the server
app.listen(5001, () => console.log('Server running on port 5001'));
