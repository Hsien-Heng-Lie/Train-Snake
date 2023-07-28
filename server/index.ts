import express, { Express } from 'express';
import dotenv from 'dotenv';
import indexController from './controllers/index.routes';
import authController from './controllers/auth.routes';
import apiController from './controllers/api.routes';
import { getHighScores } from './database/dbHandler';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import https from 'https';
dotenv.config();
import './config/passport';

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
app.use(apiController);


// SERVER
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

const port = process.env.PORT;

https.createServer(options, app).listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});