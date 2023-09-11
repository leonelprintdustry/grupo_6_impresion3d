module.exports = (sequelize, DataTypes) => {
    const alias = 'ProductosCarritoDeCompras';
  
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      carrito_de_compras_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Cambiado a "false" para no permitir valores nulos
      },
      producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Cambiado a "false" para no permitir valores nulos
      },
    };
  
    const config = {
      tableName: 'productos_carrito_de_compras',
      timestamps: false,
    };
  
    const ProductosCarritoDeCompras = sequelize.define(alias, cols, config);

  
    return ProductosCarritoDeCompras;
  };
  
