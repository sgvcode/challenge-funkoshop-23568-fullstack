const express = require('express');
const router = express.Router();

router.get('/item', (req, res) => {
    const { search } = req.query;
    res.send(search);
});


router.get('/item/:item', (req, res) => {
    const item = req.params.item;
    res.send(item);
});

router.post('/item/create', (req, res) => {
    const data = req.body;
    res.send(data);
});

router.put('/item/:edit', (req, res) => {
    res.send('Ruta para EDITAR 1 item');
});

router.delete('/item/:delete', (req, res) => {
    res.send('Ruta para BORRAR 1 item');
});

module.exports = router;