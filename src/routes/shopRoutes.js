const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Route a página Shop'));
router.get('/item/:id', (req, res) => res.send(`Route a un producto por su ID: ${req.params.id}`));
router.post('/item/:id/add', (req, res) => res.send('Route agregar un producto al carrito'));
router.get('/cart', (req, res) => res.send('Route a página de carrito'));
router.post('/cart', (req, res) => res.send('Route para ir al checkout'));

module.exports = router;