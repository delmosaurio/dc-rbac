// groups_scope
//
// group_id_groups
// target_table
// scope_rule
export default function(sequelize, DataTypes) {
  return sequelize.define('groups_scope', {
    group_id_groups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "groups",
        "key": "group_id"
      },
    },
    target_table: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    scope_rule: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'groups_scope',
    timestamps: false,
    freezeTableName: true,
  });
}