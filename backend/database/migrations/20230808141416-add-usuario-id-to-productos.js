
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('productos', 'usuario_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('productos', 'usuario_id');
  }
};

