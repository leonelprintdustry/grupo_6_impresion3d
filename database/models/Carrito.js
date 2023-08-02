
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
      }
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
  
    return Carrito;
  };
  