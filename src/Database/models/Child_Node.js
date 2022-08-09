import { DataTypes } from 'sequelize'
import Sequelize from '../utils/database'


const Child_node = Sequelize.define('VERTIX', {
    walletid: { type: DataTypes.STRING, allowNull: false },
    transaction_no: { type: DataTypes.STRING, allowNull: false },
    transaction_count: { type: DataTypes.INTEGER },
    timestamp: { type: DataTypes.STRING, allowNull: false },
    ref: { type: DataTypes.STRING, allowNull: false },
    edge_in: { type: DataTypes.STRING, allowNull: false },
    edge_out: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    body: DataTypes.STRING,

})

export default Child_node
