import { DataTypes } from 'sequelize'
import Sequelize from '../utils/database'


const Centroid = Sequelize.define('CENTROID', {
    walletid: { type: DataTypes.STRING, allowNull: true, unique: true },
    timestamp: { type: DataTypes.STRING, allowNull: true },
    ref: { type: DataTypes.STRING, allowNull: true },
    hash: { type: DataTypes.STRING, allowNull: true },
    body: DataTypes.STRING,
    amount: { type: DataTypes.FLOAT },
})

export default Centroid