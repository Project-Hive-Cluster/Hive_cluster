'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('child_nodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      centroid: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.STRING
      },
      previous_node: {
        type: Sequelize.STRING
      },
      ref_node: {
        type: Sequelize.STRING
      },
      vector_dir: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      hash: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      sign: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('child_nodes');
  }
};