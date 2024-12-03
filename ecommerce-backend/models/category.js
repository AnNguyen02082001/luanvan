'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: 'category_id' });
    }
  }
  Category.init(
    {
      category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      category_name: { type: DataTypes.STRING(100), allowNull: false },
      created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_date: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, modelName: 'Category', tableName: 'categories', timestamps: false }
  );
  return Category;
};
