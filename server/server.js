const express = require('express');
const favicon = require('serve-favicon');
const fs = require('fs');
const https = require('https');
const session = require('express-session');
const passport = require('passport');
const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
const dbRoutes = require('./routes/db.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// App configuration
const app = express();
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.session());

// Static files
app.use(favicon('public/assets/favicon.png'));
app.use(express.static('public/views/login'));
app.use(express.static('public/views/gameboard'));
app.use(express.static('public/views/leaderboard'));

// Routes
app.use(indexRoutes);
app.use(authRoutes);
app.use(dbRoutes);

// Server
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

https.createServer(options, app).listen(8000, () => {
  console.log('https://localhost:8000');
});
