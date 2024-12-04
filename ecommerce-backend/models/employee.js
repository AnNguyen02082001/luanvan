'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.hasMany(models.Bill, { foreignKey: 'employee_id' });
    }
  }
  Employee.init(
    {
      employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(1000), allowNull: false },
      name: { type: DataTypes.STRING(255), allowNull: false },
    },
    { sequelize, modelName: 'Employee', tableName: 'employees', timestamps: false }
  );
  return Employee;
};
