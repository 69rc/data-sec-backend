// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const RegisterUser = require('../models/registerusers'); // Change the import name
const LoginUser = require('../models/loginuser');
const jwt = require('jsonwebtoken'); // Change the import name

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await RegisterUser.findOne({ email }); // Use RegisterUser for registration
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new RegisterUser({ firstName, lastName, email, password: hashedPassword }); // Use RegisterUser for registration
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Attempting login for email:', email); // Log the email being used for login

    const user = await LoginUser.findOne({ email });

    if (!user) {
      console.log('User not found'); // Log if user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password'); // Log if password is invalid
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log('Login successful'); // Log if login is successful

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error); // Log any errors that occur during login
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
