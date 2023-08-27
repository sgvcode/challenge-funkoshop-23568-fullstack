const express = require('express');
const router = express.Router();
const uploadFiles = require('../middlewares/uploadFiles');
const { isLogged } = require('../middlewares/login');

const adminControllers = require('../controllers/adminControllers');

router.use(isLogged);
router.get('/', adminControllers.adminView);
router.get('/create', adminControllers.createView);
router.post('/create', uploadFiles.array('images', 2), adminControllers.createItem);
router.post('/create/bulk', adminControllers.bulkCreate);
router.get('/edit/:id', adminControllers.editView);
router.put('/edit/:id', adminControllers.editItem);
router.delete('/delete/:id', adminControllers.deleteItem);

module.exports = router;