const express = require('express');
const { getAllBills, getBillById, createBill } = require('../controllers/billController');
const router = express.Router();

// Route lấy tất cả Bills
router.get('/', getAllBills);

// Route lấy chi tiết một Bill
router.get('/:id', getBillById);

router.post('/', createBill);

module.exports = router;
