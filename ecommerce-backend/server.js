const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();  // Đọc file .env

const app = express();
app.use(cors()); // Cho phép CORS (cho phép frontend truy cập backend)
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

// Tạo API đơn giản (cho thử nghiệm)
app.get('/', (req, res) => {
    res.send('Server Node.js hoạt động!');
});

// Lắng nghe trên cổng 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
