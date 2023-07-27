const { config } = require("process");
const { DataTypes } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    let alias = "Carrito"; // Aca en el alias se pone el nombre en plural 
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        }, 
        id_usuario: {
            type: DataTypes.INTEGER
        },
        id_producto: {
            type: DataTypes.INTEGER
        },
        cantidad: {
            type: DataTypes.INTEGER
        },
        id_material: {
            type: DataTypes.INTEGER
        },
        id_color: {
            type: DataTypes.INTEGER
        },
        precio: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.INTEGER
        },
    };
    let config = {
        tableName: "carrito",
        timeamps: false // sequelize asume que la tabla tiene create si no las tiene va a fallar 
    };
    const Carrito = sequelize.define(alias, cols, config) // Esta constante la llamamos igual que la carpeta

    return Carrito 
}