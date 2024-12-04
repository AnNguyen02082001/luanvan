const express = require('express');
const router = express.Router();
const { loginEmployee, registerEmployee } = require('../controllers/emloyeeController');

// Định nghĩa các route
router.post('/login', loginEmployee);
router.post('/register', registerEmployee);

module.exports = router;