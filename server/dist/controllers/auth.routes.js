"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport = require('passport');
require('../controllers/passport');
const authController = express_1.default.Router();
authController.get('/auth/google/login', passport.authenticate('google', {
    scope: ['email', 'profile'],
}));
authController.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/game',
    failureRedirect: '/auth/google/failure',
}));
authController.get('/auth/google/failure', (req, res) => {
    res.send('Something went wrong with Google authentication.');
});
exports.default = authController;
