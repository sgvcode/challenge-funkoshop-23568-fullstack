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


// Middleware a nivel de ruta (paso intermedio)
app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

// Manejador de ruta para la raíz que redirige a /home
// app.get('/', (req, res) => {
//     res.redirect('/home');
// });

// app.get('/home', (req, res) => { res.sendFile(__dirname + '/public_html/index.html') });



app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));