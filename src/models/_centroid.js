'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Centroid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Centroid.init({
    walletid: { type: DataTypes.STRING, allowNull: false, unique: true },
    timestamp: { type: DataTypes.STRING, allowNull: false, unique: true },
    ref: { type: DataTypes.STRING, allowNull: false, unique: true },
    hash: { type: DataTypes.STRING, allowNull: false, unique: true },
    body: DataTypes.STRING,
    amount: { type: DataTypes.FLOAT, allowNull: false, unique: true },
    sign: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'CENTROID',
  });
  return Centroid;
};