const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();  // Đọc file .env

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Chỉ cho phép frontend từ localhost:3000 truy cập
}));
app.use(express.json()); // Để xử lý JSON body

// Kết nối tới MySQL với Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Kiểm tra kết nối tới CSDL
sequelize.authenticate()
    .then(() => console.log('Kết nối CSDL thành công!'))
    .catch((error) => console.error('Kết nối CSDL thất bại:', error));

// Import routes của sản phẩm
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes); // Route để quản lý sản phẩm

// Route mặc định
app.get('/', (req, res) => {
    res.send('Server Node.js hoạt động!');
});

// Lắng nghe trên cổng 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
