'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class child_node extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  child_node.init({
    centroid: { type: DataTypes.STRING, allowNull: false, unique: true },
    timestamp: { type: DataTypes.STRING, allowNull: false, unique: true },
    previous_node: { type: DataTypes.STRING, allowNull: false, unique: true },
    ref_node: { type: DataTypes.STRING, allowNull: false, unique: true },
    vector_dir: { type: DataTypes.STRING, allowNull: false, unique: true },
    amount: { type: DataTypes.FLOAT, allowNull: false, unique: true },
    hash: { type: DataTypes.STRING, allowNull: false, unique: true },
    body: DataTypes.STRING,
    sign: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'child_node',
  });
  return child_node;
};