'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bills', {
      bill_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'wallets',
          key: 'wallet_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'employees',
          key: 'employee_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'customer_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      delivery_status: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      shipping_address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bills');
  },
};
