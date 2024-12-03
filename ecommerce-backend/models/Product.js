'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'category_id' });
      Product.hasMany(models.Cart, { foreignKey: 'product_id' });
    }
  }
  Product.init(
    {
      product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      category_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING(255), allowNull: false },
      stock_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
      image_url: { type: DataTypes.STRING(255), allowNull: true },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_date: { type: DataTypes.DATE, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      color: { type: DataTypes.STRING(30), allowNull: true },
      ram: { type: DataTypes.STRING(30), allowNull: true },
    },
    { sequelize, modelName: 'Product', tableName: 'products', timestamps: false }
  );
  return Product;
};
