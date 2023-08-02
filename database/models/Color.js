module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
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
        tableName: 'colores',
        timestamps: false
    });

    return Color;
};
