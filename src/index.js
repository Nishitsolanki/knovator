// app.js or server.js
const express = require('express');
const mongoose = require('mongoose');
// const passport = require('./config/passport');
var passport = require('passport')
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const { getDashboard } = require('./controller/dashboardController');

const app = express();

mongoose.connect('mongodb+srv://nisitsolanki:9978793231@cluster0.te1decq.mongodb.net/posts', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database:', err));

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/post', postRoutes);

app.get('/dashboard', passport.authenticate('jwt', { session: false }), getDashboard);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
