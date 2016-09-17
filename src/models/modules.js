// modules
//
// module
// app_apps
// module_description
export default function(sequelize, DataTypes) {
  return sequelize.define('modules', {
    module: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    app_apps: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        "model": "apps",
        "key": "app"
      },
    },
    module_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'modules',
    timestamps: false,
    freezeTableName: true,
  });
}