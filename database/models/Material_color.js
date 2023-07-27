const { config } = require("process");
const { DataTypes } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    let alias = "Material_colores"; // Aca en el alias se pone el nombre en plural 
    let cols = {
        id_material_color: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        }, 
        id_material: {
            type: DataTypes.INTEGER
        },
        id_color: {
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName: "material_color",
        timeamps: false // sequelize asume que la tabla tiene create si no las tiene va a fallar 
    };
    const material_color = sequelize.define(alias, cols, config) // Esta constante la llamamos igual que la carpeta

    return material_color 
}