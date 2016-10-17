// actions
//
// action_id
// action
// module_id_modules
// bit_value
// action_caption
// action_description
export default function(sequelize, DataTypes) {
  return sequelize.define('actions', {
    action_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    module_id_modules: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "modules",
        "key": "module_id"
      },
    },
    bit_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action_caption: {
      type: DataTypes.STRING,
      allowNull: true,
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