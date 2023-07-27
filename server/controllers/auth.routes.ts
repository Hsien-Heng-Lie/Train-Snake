import express from 'express';

const passport = require('passport');
require('../controllers/passport');

const authController = express.Router();

authController.get(
    '/auth/google/login',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })
);

authController.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/game',
        failureRedirect: '/auth/google/failure',
    })
);

authController.get('/auth/google/failure', (req, res) => {
    res.send('Something went wrong with Google authentication.');
});

export default authController;
