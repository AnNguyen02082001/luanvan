const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, getProductById } = require('../controllers/productsController');

// Định nghĩa các route
router.get('/:id', getProductById);

router.get('/', getAllProducts); 

module.exports = router;
