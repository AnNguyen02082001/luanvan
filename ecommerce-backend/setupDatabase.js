const { sequelize } = require('./models'); // Thay đổi đường dẫn nếu cần

const createDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Chỉ sử dụng `force: true` trong môi trường phát triển
        console.log('Database and tables created!');
    } catch (error) {
        console.error('Error creating database:', error);
    }
};

createDatabase();
