'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    status: DataTypes.ENUM,
    total_amount: DataTypes.DECIMAL,
    shipping_address: DataTypes.TEXT,
    payment_status: DataTypes.ENUM,
    shipping_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};