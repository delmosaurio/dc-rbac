// groups_memberships
//
// group_id_groups
// user_id_users
export default function(sequelize, DataTypes) {
  return sequelize.define('groups_memberships', {
    group_id_groups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "groups",
        "key": "group_id"
      },
    },
    user_id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "users",
        "key": "user_id"
      },
    },
  }, {
    tableName: 'groups_memberships',
    timestamps: false,
    freezeTableName: true,
  });
}