module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'categorias',
        timestamps: false
    });

    return Categoria;
};
