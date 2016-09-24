// actions
//
// app_apps
// module_modules
// action
// bit_value
// action_description
export default function(sequelize, DataTypes) {
  return sequelize.define('actions', {
    app_apps: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "apps",
        "key": "app"
      },
    },
    module_modules: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    bit_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'actions',
    timestamps: false,
    freezeTableName: true,
  });
}