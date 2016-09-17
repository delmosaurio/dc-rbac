// apps
//
// app
// app_caption
// app_description
export default function(sequelize, DataTypes) {
  return sequelize.define('apps', {
    app: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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