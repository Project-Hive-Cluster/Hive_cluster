import { DataTypes } from 'sequelize'
import Sequelize from '../utils/database'


const Centroid = Sequelize.define('CENTROID', {
    walletid: { type: DataTypes.STRING, allowNull: false, unique: true },
    timestamp: { type: DataTypes.STRING, allowNull: false, unique: true },
    ref: { type: DataTypes.STRING, allowNull: false, unique: true },
    hash: { type: DataTypes.STRING, allowNull: false, unique: true },
    body: DataTypes.STRING,
    amount: { type: DataTypes.FLOAT, allowNull: false, unique: true },
    sign: { type: DataTypes.STRING, allowNull: false, unique: true },
})

export default Centroid