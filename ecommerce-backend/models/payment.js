'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    order_id: DataTypes.INTEGER,
    payment_method: DataTypes.ENUM,
    amount_paid: DataTypes.DECIMAL,
    payment_date: DataTypes.DATE,
    payment_status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};