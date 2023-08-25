const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.APP_PORT || 3001;

const adminRoutes = require('./src/routes/adminRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');

app.use(express.static('public_html'));

app.use(express.urlencoded());
app.use(express.json());

// Middleware a nivel de ruta (paso intermedio)
app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);


// app.get('/home', (req, res) => { res.sendFile(__dirname + '/public_html/index.html') });


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));