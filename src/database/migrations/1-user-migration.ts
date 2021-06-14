module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          unique: true
        },
        login: {
          allowNull: true,
          type: Sequelize.TEXT
        },
        password: {
          allowNull: true,
          type: Sequelize.TEXT
        },
        age: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        isdeleted: {
          allowNull: true,
          type: Sequelize.BOOLEAN
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
      await queryInterface.dropTable('Users');
  }
};
