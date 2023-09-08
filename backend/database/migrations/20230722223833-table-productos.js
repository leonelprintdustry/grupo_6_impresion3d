'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categorias',
          key: 'id'
        }
      },
      id_color: {
      type: Sequelize.INTEGER,
       allowNull: false,
       references: {
         model: 'colores',
         key: 'id'
       }
     },
     id_material: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'materiales',
        key: 'id'
      }
     },
     createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productos');
  }
};




