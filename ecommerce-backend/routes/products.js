const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        console.log('Sản phẩm đã được lấy:', products); // Log sản phẩm
        res.json(products);
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error); // Log lỗi
        res.status(500).json({ error: 'Có aa lỗi xảy ra khi lấy danh sách sản phẩm' });
    }
});

module.exports = router;

