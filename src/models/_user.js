'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: { type: DataTypes.UUID, autoIncrement: true, unique: true },
    reg_date: { type: DataTypes.DATE, allowNull: false, unique: true },
    wallet: { type: DataTypes.STRING, allowNull: false, unique: true },
    firstName: { type: DataTypes.STRING, allowNull: false, unique: true },
    lastName: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    contact: { type: DataTypes.STRING, allowNull: false, unique: true },
    secret: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false, unique: true },
    recovery: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};