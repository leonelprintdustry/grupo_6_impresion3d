
module.exports = (sequelize, DataTypes) => {
    const alias = 'Carrito';
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      precio_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Producto',
          key: 'id'
        }
      },
    };
  
    const config = {
      tableName: 'carrito_de_compras',
      timestamps: false
    };
  
    const Carrito = sequelize.define(alias, cols, config);
  
    Carrito.associate = models => {
      // Asociación con Usuario
      Carrito.belongsTo(models.Usuario, {
        as: 'usuario',
        foreignKey: 'usuario_id'
      });
  
      // Asociación con Producto
      Carrito.belongsTo(models.Producto, {
        as: 'producto',
        foreignKey: 'producto_id'
      });
    };

    Carrito.obtenerProductosEnCarritoDelUsuario = async (userId) => {
      try {
          const productsInCart = await Carrito.findAll({
              where: { usuario_id: userId },
              include: { model: sequelize.models.Producto, as: 'producto' } 
          });
          return productsInCart;
      } catch (error) {
          throw error;
      }
  };
  
    return Carrito;
    };
  