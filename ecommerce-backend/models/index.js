// models/index.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import sequelize từ file database.js

// Định nghĩa mô hình Product
const Product = require('./Product')(sequelize, DataTypes);

// Xuất sequelize và các mô hình
module.exports = {
    sequelize,
    Product,
};
