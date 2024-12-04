const express = require('express');
const {
  getAllCarts,
  getCartById,
  addCart,
  updateCart,
  deleteCart,
} = require('../controllers/cartController');
const router = express.Router();

// Lấy tất cả Cart items
router.get('/', getAllCarts);

// Lấy chi tiết một Cart item
router.get('/:customer_id/:product_id', getCartById);

// Thêm Cart item
router.post('/', addCart);

// Sửa Cart item
router.put('/:customer_id/:product_id', updateCart);

// Xóa Cart item
router.delete('/:customer_id/:product_id', deleteCart);

module.exports = router;
