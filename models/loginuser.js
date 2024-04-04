// models/LoginUser.js

const mongoose = require('mongoose');

const loginUserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Specify the collection name as 'login'
const LoginUser = mongoose.model('LoginUser', loginUserSchema, 'register');

module.exports = LoginUser;
