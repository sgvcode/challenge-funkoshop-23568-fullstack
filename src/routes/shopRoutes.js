const express = require('express');
const shopControllers = require('../controllers/shopControllers');
const router = express.Router();

router.get('/', shopControllers.shopView);
router.get('/item/:id', shopControllers.itemView);
router.post('/item/:id/add', shopControllers.addToCart);
router.get('/cart', shopControllers.cart);
router.get('/cart/count', shopControllers.getCartCount);

router.post('/cart/updateQuantity/:productId/:action', shopControllers.updateQuantity);
router.post('/cart/delete/:id', shopControllers.deleteCart);
router.post('/cart/checkout', shopControllers.checkout);

router.get('/page/:page', shopControllers.shopView); //Para paginación

module.exports = router;
