const express = require('express');
const PORT = 3001;
const app = express();
const adminRoutes = require('./src/routes/adminRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');

app.use(express.static('public_html'));


// Middleware a nivel de ruta (paso intermedio)
app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);


// app.get('/home', (req, res) => { res.sendFile(__dirname + '/public_html/index.html') });
// app.get('/contact', (req, res) => res.sendFile(__dirname + '/public_html/contact.html'));

// app.get('/shop', (req, res) => res.sendFile(__dirname + '/public_html/pages/shop/shop.html'));
// app.get('/cart', (req, res) => res.sendFile(__dirname + '/public_html/pages/shop/cart.html'));

// // Admin
// app.get('/admin', (req, res) => res.sendFile(__dirname + '/public_html/pages/admin/admin.html'));
// app.get('/login', (req, res) => res.sendFile(__dirname + '/public_html/pages/admin/login.html'));
// app.get('/register', (req, res) => res.sendFile(__dirname + '/public_html/pages/admin/register.html'));

app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));