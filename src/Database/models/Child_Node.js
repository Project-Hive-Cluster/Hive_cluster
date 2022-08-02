import { DataTypes } from 'sequelize'
import Sequelize from '../utils/database'


const Child_node = Sequelize.define('CHILD_NODE', {
    centroid: { type: DataTypes.STRING, allowNull: false, unique: true },
    timestamp: { type: DataTypes.STRING, allowNull: false, unique: true },
    previous_node: { type: DataTypes.STRING, allowNull: false, unique: true },
    ref_node: { type: DataTypes.STRING, allowNull: false, unique: true },
    vector_dir: { type: DataTypes.STRING, allowNull: false, unique: true },
    amount: { type: DataTypes.FLOAT, allowNull: false, unique: true },
    hash: { type: DataTypes.STRING, allowNull: false, unique: true },
    body: DataTypes.STRING,
    sign: { type: DataTypes.STRING, allowNull: false, unique: true },
})

export default Child_node