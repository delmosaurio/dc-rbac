// groups_privileges
//
// group_id_groups
// actions_access_grant
// actions_access_deny
export default function(sequelize, DataTypes) {
  return sequelize.define('groups_privileges', {
    group_id_groups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "groups",
        "key": "group_id"
      },
    },
    actions_access_grant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actions_access_deny: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'groups_privileges',
    timestamps: false,
    freezeTableName: true,
  });
}