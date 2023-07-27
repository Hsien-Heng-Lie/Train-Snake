import express, { Express } from 'express';
import dotenv from 'dotenv';
import indexController from './controllers/index.routes';
import authController from './controllers/auth.routes';
import { getHighScores } from './database/dbHandler';
import path from 'path';
import bodyParser from 'body-parser';
dotenv.config();

// DEBUG ///////////////////////////
console.log(process.env.DATABASE);
let res = getHighScores();
console.log(res);
////////////////////////////////////

const app: Express = express();
const passport = require('passport');
const session = require('express-session');

// SESSIONS
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session());


app.use(bodyParser.json());

// VIEWS
app.use(express.static(path.join(__dirname, "..", "client", "markup")));
app.use(express.static(path.join(__dirname, "..", "client", "scripts")));
app.use(express.static(path.join(__dirname, "..", "client", "styles")));
app.use(express.static(path.join(__dirname, "..", "client", "resources")));


// CONTROLLERS
app.use(indexController);
app.use(authController);


// WEBSERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});