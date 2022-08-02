import * as pg from 'pg';
import { Sequelize } from 'sequelize';

// module.exports = new Sequelize('postgres://hornet:hornet@127.0.0.1:5432/HIVE_CLUSTER_DEV', {
//     dialectModule: pg
// });

module.exports = new Sequelize('HIVE_CLUSTER_DEV', 'hornet', 'hornet', {
    host: '127.0.0.1',
    dialect: 'postgres',
    dialectModule: pg,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
