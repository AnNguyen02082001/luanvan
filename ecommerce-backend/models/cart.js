'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Customer, { foreignKey: 'customer_id' });
      Cart.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  Cart.init(
    {
      customer_id: { type: DataTypes.INTEGER, primaryKey: true },
      product_id: { type: DataTypes.INTEGER, primaryKey: true },
      bill_id: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      quantity_product: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: 'Cart', tableName: 'carts', timestamps: false }
  );
  return Cart;
};
