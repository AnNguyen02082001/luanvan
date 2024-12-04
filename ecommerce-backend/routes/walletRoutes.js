const express = require('express');
const {
  getAllWallets,
  getWalletById,
  createWallet,
  updateWallet,
  deleteWallet,
} = require('../controllers/walletController');
const router = express.Router();

// Lấy tất cả Wallets
router.get('/', getAllWallets);

// Lấy chi tiết Wallet
router.get('/:id', getWalletById);

// Tạo Wallet mới
router.post('/', createWallet);

// Cập nhật Wallet
router.put('/update/:id', updateWallet);

// Xóa Wallet
router.delete('/delete/:id', deleteWallet);

module.exports = router;
