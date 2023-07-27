const { config } = require("process");
const { DataTypes } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    let alias = "Productos"; // Aca en el alias se pone el nombre en plural 
    let cols = {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        }, 
        nombre: {
            type: DataTypes.VARCHAR
        },
        descripcion: {
            type: DataTypes.VARCHAR
        },
        precio: {
            type: DataTypes.INTEGER
        },
        id_categoria: {
            type: DataTypes.INTEGER
        },
        id_material: {
            type: DataTypes.INTEGER
        },
        id_color: {
            type: DataTypes.INTEGER
        },
        imagen_producto: {
            type: DataTypes.INTEGER
        },
    };
    let config = {
        tableName: "productos",
        timeamps: false // sequelize asume que la tabla tiene create si no las tiene va a fallar 
    };
    const Producto = sequelize.define(alias, cols, config) // Esta constante la llamamos igual que la carpeta

    return Producto 
}