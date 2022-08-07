import { DataTypes } from 'sequelize'
import Sequelize from '../utils/database'


const User = Sequelize.define('USER', {
    username: {
        type: DataTypes.STRING
    },
    reg_date: {
        type: DataTypes.STRING
    },
    wallet: {
        type: DataTypes.STRING
    },
    key: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    contact: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
})

export default User