const express = require('express');
const app = express();
const PORT = 3002;
const itemRoutes = require('./src/routes/itemRoutes');

app.use(express.static('public_html'));

app.use(express.urlencoded());
app.use(express.json());


// Middleware a nivel de ruta (paso intermedio)
app.use('/', itemRoutes);


app.get('/home', (req, res) => { res.sendFile(__dirname + '/public_html/index.html') });

app.get('/contact', (req, res) => res.sendFile(__dirname + '/public_html/contact.html'));
app.get('/shop', (req, res) => res.sendFile(__dirname + '/public_html/pages/shop/shop.html'));
app.get('/cart', (req, res) => res.sendFile(__dirname + '/public_html/pages/shop/cart.html'));
app.get('/login', (req, res) => res.sendFile(__dirname + '/public_html/pages/admin/login.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/public_html/pages/admin/register.html'));

// Admin
app.get('/admin', (req, res) => res.sendFile(__dirname + '/public_html/pages/admin/admin.html'));

app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
