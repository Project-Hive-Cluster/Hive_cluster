const sequelize = require('../../Database/utils/database')
const { DataTypes } = require("sequelize");
const User = sequelize.define("USER", {
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
  status: { type: DataTypes.BOOLEAN, allowNull: false, unique: true },
})

sequelize.sync().then(() => {
  console.log('Book table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});





