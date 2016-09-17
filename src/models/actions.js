// actions
//
// module_modules
// action
// bit_value
// action_description
export default function(sequelize, DataTypes) {
  return sequelize.define('actions', {
    module_modules: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "modules",
        "key": "module"
      },
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