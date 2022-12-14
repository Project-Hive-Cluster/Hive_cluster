const pg = require("pg")
const { Sequelize } = require("sequelize")

// module.exports = new Sequelize('postgres://hornet:hornet@127.0.0.1:5432/HIVE_CLUSTER_DEV', {
//     dialectModule: pg
// });

module.exports = new Sequelize("postgres", "hornet", "hornet", {
  host: "127.0.0.1",
  dialect: "postgres",
  port: "5432",
  dialectModule: pg,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
