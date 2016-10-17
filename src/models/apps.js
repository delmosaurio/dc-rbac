// apps
//
// app_id
// app
// app_caption
// app_description
export default function(sequelize, DataTypes) {
  return sequelize.define('apps', {
    app_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    app: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    app_caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    app_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'apps',
    timestamps: false,
    freezeTableName: true,
  });
}