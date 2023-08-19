const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.static('public_html'))

app.get('/home', (req, res) => {

    //toda la lógica (llamada a bd, etc)

    res.sendFile(__dirname + '/public_html/index.html')
}
);

app.get('/contact', (req, res) => res.sendFile(__dirname + '/public_html/contact.html'));

app.get('/shop', (req, res) => res.sendFile(__dirname + '/public_html/pages/shop/shop.html'));
app.get('/cart', (req, res) => res.sendFile(__dirname + '/public_html/pages/shop/cart.html'));
app.get('/item', (req, res) => res.sendFile(__dirname + '/public_html/pages/shop/item.html'));
app.get('/login', (req, res) => res.sendFile(__dirname + '/public_html/pages/admin/login.html'));

app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
