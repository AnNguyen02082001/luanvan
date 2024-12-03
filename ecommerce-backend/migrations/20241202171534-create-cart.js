'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'customers', // Tên bảng `customers`
          key: 'customer_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'products', // Tên bảng `products`
          key: 'product_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      bill_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Cho phép NULL để hỗ trợ SET NULL
        references: {
          model: 'bills',
          key: 'bill_id',
        },
        onDelete: 'SET NULL', // Khi hóa đơn bị xóa, giá trị của bill_id sẽ được đặt thành NULL
        onUpdate: 'CASCADE',
      },
      
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  },
};
