const express = require('express');
const router = express.Router();
const { addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById, } = require('../controllers/categoryController');

// Route thêm category
router.post('/add', addCategory);

// Route sửa category
router.put('/update/:id', updateCategory);

// Route xóa category
router.delete('/delete/:id', deleteCategory);

// Route lấy tất cả categories
router.get('/', getAllCategories);

// Route lấy chi tiết một category
router.get('/:id', getCategoryById);


module.exports = router;
