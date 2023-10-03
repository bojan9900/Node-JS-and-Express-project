const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');


const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// View engine
app.set('view engine', 'ejs');

// Database connection
const dbURI = 'mongodb+srv://bojan:Danilobrum3005@cluster0.ip2ismc.mongodb.net/node-js';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);
