module.exports = (sequelize, DataTypes) => {
const Material = sequelize.define('Material', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
    tableName: 'materiales',
    timestamps: false
});

return Material;

}