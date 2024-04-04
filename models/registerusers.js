// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Specify the collection name as 'register'
const User = mongoose.model('User', userSchema, 'register');

module.exports = User;
