const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
// const session = require('express-session');
const initSession = require('./src/utils/session');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.APP_PORT || 3005;

const adminRoutes = require('./src/routes/adminRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use(express.static(path.resolve(__dirname, 'public_html')));
app.use(cors());
app.use(initSession());
app.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Configuracion de EJS
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

// Ruta de redirección para la página de inicio
app.get('/', (req, res) => {
    res.redirect('/home'); // Redirige a /home
});


// Middleware a nivel de ruta (paso intermedio)
app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, () => console.log(`Servidor corriendo en 🔥 http://localhost:${PORT}...`));