const session = require('express-session');
require('dotenv').config();

function initSession() {
    return session({
        secret: process.env.SESSION_NAME, // Cambia esto por una cadena secreta segura
        resave: false,
        saveUninitialized: true,
    });
};

module.exports = initSession;