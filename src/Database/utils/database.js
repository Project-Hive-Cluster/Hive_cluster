// const sequelize = new Sequelize(
//     'HIVE_CLUSTER_DEV',
//     'hornet',
//     'hornet',
//     {
//         host: '127.0.0.1',
//         dialect: 'postgres'
//     }
// )


import * as pg from 'pg';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://hornet:hornet@127.0.0.1:5432/HIVE_CLUSTER_DEV', {
    dialectModule: pg
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize