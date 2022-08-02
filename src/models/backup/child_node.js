const sequelize = require('../Database/utils/database')
const { DataTypes } = require("sequelize");
const Child_Node = sequelize.define("CHILD_NODE", {
  centroid: { type: DataTypes.STRING, allowNull: false, unique: true },
  timestamp: { type: DataTypes.STRING, allowNull: false, unique: true },
  previous_node: { type: DataTypes.STRING, allowNull: false, unique: true },
  ref_node: { type: DataTypes.STRING, allowNull: false, unique: true },
  node_type: { type: DataTypes.STRING, allowNull: false, unique: true },
  amount: { type: DataTypes.FLOAT, allowNull: false, unique: true },
  hash: { type: DataTypes.STRING, allowNull: false, unique: true },
  body: DataTypes.STRING,
  sign: { type: DataTypes.STRING, allowNull: false, unique: true },
})

sequelize.sync().then(() => {
  console.log('Book table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});
