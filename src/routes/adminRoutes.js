const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');

router.get('/', adminControllers.adminView);
router.get('/items', adminControllers.itemsView);//borrar
router.get('/create', adminControllers.createView);
router.post('/create', adminControllers.createItem);
router.get('/edit/:id', adminControllers.editView);
router.put('/edit/:id', adminControllers.editItem);
router.delete('/delete/:id', adminControllers.deleteItem);
router.get('/login', adminControllers.loginView);
router.post('/login', adminControllers.loginUser);
router.get('/register', adminControllers.registerView);
router.post('/register', adminControllers.registerUser);

module.exports = router;