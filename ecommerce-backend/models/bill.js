'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {
      Bill.belongsTo(models.Customer, { foreignKey: 'customer_id' });
      Bill.belongsTo(models.Employee, { foreignKey: 'employee_id' });
      Bill.belongsTo(models.Wallet, { foreignKey: 'wallet_id' });
    }
  }
  Bill.init(
    {
      bill_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      wallet_id: { type: DataTypes.INTEGER, allowNull: false },
      employee_id: { type: DataTypes.INTEGER, allowNull: true },
      customer_id: { type: DataTypes.INTEGER, allowNull: false },
      delivery_status: { type: DataTypes.TEXT, allowNull: false },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      shipping_address: { type: DataTypes.TEXT, allowNull: false },
      created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      delivery_date: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, modelName: 'Bill', tableName: 'bills', timestamps: false }
  );
  return Bill;
};
