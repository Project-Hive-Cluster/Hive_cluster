// Include Sequelize module.
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'HIVE_CLUSTER_DEV',
    'hornet',
    'hornet',
    {
        host: '127.0.0.1',
        dialect: 'postgres'
    }
);

const Centroid = sequelize.define('CENTROID', {

    walletid: { type: DataTypes.STRING, allowNull: false, unique: true },
    timestamp: { type: DataTypes.STRING, allowNull: false, unique: true },
    ref: { type: DataTypes.STRING, allowNull: false, unique: true },
    hash: { type: DataTypes.STRING, allowNull: false, unique: true },
    body: DataTypes.STRING,
    amount: { type: DataTypes.FLOAT, allowNull: false, unique: true },
    sign: { type: DataTypes.STRING, allowNull: false, unique: true },

    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})
// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
module.exports = Centroid


const Child_Node = sequelize.define('CENTROID', {

    centroid: { type: DataTypes.STRING, allowNull: false, unique: true },
    timestamp: { type: DataTypes.STRING, allowNull: false, unique: true },
    previous_node: { type: DataTypes.STRING, allowNull: false, unique: true },
    ref_node: { type: DataTypes.STRING, allowNull: false, unique: true },
    node_type: { type: DataTypes.STRING, allowNull: false, unique: true },
    amount: { type: DataTypes.FLOAT, allowNull: false, unique: true },
    hash: { type: DataTypes.STRING, allowNull: false, unique: true },
    body: DataTypes.STRING,
    sign: { type: DataTypes.STRING, allowNull: false, unique: true },

    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})
// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
module.exports = Child_Node



const User = sequelize.define('USER', {

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

    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})
// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
module.exports = User

module.exports = { init }
