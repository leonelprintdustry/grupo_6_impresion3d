const { config } = require("process");
const { DataTypes } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    let alias = "Categorias"; // Aca en el alias se pone el nombre en plural 
    let cols = {
        id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        }, 
        nombre: {
            type: DataTypes.VARCHAR
        },
        activo: {
            type: DataTypes.TINYINT
        }
    };
    let config = {
        tableName: "categorias",
        timeamps: false // sequelize asume que la tabla tiene create si no las tiene va a fallar 
    };
    const categorias = sequelize.define(alias, cols, config) // Esta constante la llamamos igual que la carpeta

    return categorias 
}