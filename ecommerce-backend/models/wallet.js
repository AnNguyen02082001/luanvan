'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate(models) {
      Wallet.hasMany(models.Bill, { foreignKey: 'wallet_id' });
    }
  }

  Wallet.init(
    {
      wallet_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
    },
    { sequelize, modelName: 'Wallet', tableName: 'wallets', timestamps: false }
  );

  return Wallet;
};
