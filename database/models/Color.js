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
        },
        codigo: {
            type: DataTypes.STRING, // Almacena el código hexadecimal del color
            allowNull: false
        }
    },

     {
        tableName: 'colores',
        timestamps: false
    });

    Color.associate = models => {
        Color.hasMany(models.Producto, {
             as: 'productos', 
             foreignKey: 'id_color'
             });

    }
    return Color;
};
