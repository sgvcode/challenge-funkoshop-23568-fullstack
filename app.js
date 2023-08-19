const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.static('public_html'))

// app.get('/home', (req, res) => {

//     //toda la lógica (llamada a bd, etc)

//     res.sendFile(__dirname + '/public_html/index.html')
// }
// );


app.get('/shop', (req, res) => res.sendFile(__dirname + '/public_html/pages/shop/shop.html'));
app.get('/ping', (req, res) => res.send('pong'));

app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
