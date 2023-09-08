module.exports = (sequelize, DataTypes) => {
    const alias = 'Usuario';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        tableName: 'usuarios',
        timestamps: false
    };

    const Usuario = sequelize.define(alias, cols, config);

   Usuario.associate = models => {
    Usuario.hasMany(models.Producto, {
        as: 'productos', 
        foreignKey: 'usuario_id',
    });

    Usuario.hasMany(models.Carrito, {
        as: 'carritos',
        foreignKey: 'usuario_id'
    });
   }
    return Usuario;
};

