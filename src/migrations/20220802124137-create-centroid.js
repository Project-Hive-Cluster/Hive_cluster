'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('centroids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      walletid: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.STRING
      },
      ref: {
        type: Sequelize.STRING
      },
      hash: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('centroids');
  }
};