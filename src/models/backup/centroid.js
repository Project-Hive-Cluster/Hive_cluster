const sequelize = require('../Database/utils/database')
const { DataTypes } = require("sequelize");



const Centroid = sequelize.define("CENTROID", {
  walletid: { type: DataTypes.STRING, allowNull: false, unique: true },
  timestamp: { type: DataTypes.STRING, allowNull: false, unique: true },
  ref: { type: DataTypes.STRING, allowNull: false, unique: true },
  hash: { type: DataTypes.STRING, allowNull: false, unique: true },
  body: DataTypes.STRING,
  amount: { type: DataTypes.FLOAT, allowNull: false, unique: true },
  sign: { type: DataTypes.STRING, allowNull: false, unique: true },
})
sequelize.sync().then(() => {
  console.log('Book table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});


