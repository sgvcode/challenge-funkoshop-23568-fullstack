const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

require('dotenv').config();

const PORT = process.env.APP_PORT || 3001;

const adminRoutes = require('./src/routes/adminRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use(express.static(path.resolve(__dirname, 'public_html')));

// Configuracion de EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');

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


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));