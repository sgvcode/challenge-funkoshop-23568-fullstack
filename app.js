const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

const PORT = process.env.APP_PORT || 3001;

const adminRoutes = require('./src/routes/adminRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');

app.use(express.static(path.resolve(__dirname, 'public_html')));

// Configuracion de EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middleware a nivel de ruta (paso intermedio)
app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);

// Manejador de ruta para la raíz que redirige a /home
// app.get('/', (req, res) => {
//     res.redirect('/home');
// });

// app.get('/home', (req, res) => { res.sendFile(__dirname + '/public_html/index.html') });


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));