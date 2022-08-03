import { DataTypes } from 'sequelize'
import Sequelize from '../utils/database'


const Centroid = Sequelize.define('CENTROID', {

    walletid: { type: DataTypes.STRING, allowNull: false, unique: true },
    timestamp: { type: DataTypes.STRING, allowNull: false },
    ref: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    body: DataTypes.STRING,
    amount: { type: DataTypes.FLOAT },

})

export default Centroid