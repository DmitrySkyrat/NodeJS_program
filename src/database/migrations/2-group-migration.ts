module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Groups', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          unique: true
        },
        name: {
          allowNull: true,
          type: Sequelize.TEXT
        },
        permissions: {
          allowNull: true,
          type: Sequelize.ARRAY(Sequelize.TEXT)
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Groups');
  }
};
