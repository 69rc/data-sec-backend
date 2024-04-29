// index.js (or wherever your Express server is defined)

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors')
const multer = require('multer'); // For handling file uploads
const fs = require('fs'); // For file operations
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors())

mongoose.connect('mongodb://localhost:27017/data_sec', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', authRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
