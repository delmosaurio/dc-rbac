// modules
//
// module_id
// module
// module_caption
// app_id_apps
// module_description
export default function(sequelize, DataTypes) {
  return sequelize.define('modules', {
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    module_caption: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    app_id_apps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "apps",
        "key": "app_id"
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