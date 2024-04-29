const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  lastName: String
});

// Define user model
const User = mongoose.model('Users', userSchema, 'register');

module.exports = User;
