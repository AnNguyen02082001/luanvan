// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Đảm bảo dotenv được import

// Lấy thông tin cấu hình từ biến môi trường
const dbConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', // Chắc chắn rằng dialect đúng
};

// Khởi tạo kết nối với cơ sở dữ liệu
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
});

// Kiểm tra kết nối
sequelize.authenticate()
    .then(() => {
        console.log('Kết nối thành công đến cơ sở dữ liệu.');
    })
    .catch(err => {
        console.error('Không thể kết nối đến cơ sở dữ liệu:', err);
    });

module.exports = sequelize; // Xuất sequelize để sử dụng ở nơi khác
