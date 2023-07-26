const { config } = require("process");
const { DataTypes } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    let alias = "Usuarios"; // Aca en el alias se pone el nombre en plural 
    let cols = {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        }, 
        nombre_apllido: {
            type: DataTypes.VARCHAR
        },
        nombre_usuario: {
            type: DataTypes.VARCHAR
        },
        email: {
            type: DataTypes.VARCHAR
        },
        fecha_nacimiento: {
            type: DataTypes.DATE
        }, 
        pais_nacimiento: {
            type: DataTypes.TEXT
        }, 
        domicilio: {
            type: DataTypes.TEXT
        }, 
        cotrasena: {
            type: DataTypes.VARCHAR
        }, 
        imagen_usuario: {
            type: DataTypes.VARCHAR
        },
    };
    let config = {
        tableName: "usuarios",
        timeamps: false // sequelize asume que la tabla tiene create si no las tiene va a fallar 
    };
    const Usuario = sequelize.define(alias, cols, config) // Esta constante la llamamos igual que la carpeta

    return Usuario 
}