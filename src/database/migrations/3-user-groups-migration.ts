module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('UserGroup', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          unique: true
        },
        UserId: {
          type: Sequelize.UUID,
          references: { model: 'Users', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: false,
        },
        GroupId: {
          type: Sequelize.UUID,
          references: { model: 'Groups', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: false,
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
      await queryInterface.dropTable('UserGroup');
  }
};
