'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Bill, { foreignKey: 'customer_id' });
      Customer.hasMany(models.Cart, { foreignKey: 'customer_id' });
    }
  }
  Customer.init(
    {
      customer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(1000), allowNull: false },
      phone_number: { type: DataTypes.DECIMAL(20, 0), allowNull: false, unique: true },
      update_date: { type: DataTypes.DATE, allowNull: true },
      address: { type: DataTypes.TEXT, allowNull: false },
      name: { type: DataTypes.STRING(255), allowNull: false },
    },
    { sequelize, modelName: 'Customer', tableName: 'customers', timestamps: false }
  );
  return Customer;
};
