// users_privileges
//
// user_id_users
// module_id_modules
// actions_access_grant
// actions_access_deny
export default function(sequelize, DataTypes) {
  return sequelize.define('users_privileges', {
    user_id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "users",
        "key": "user_id"
      },
    },
    module_id_modules: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "modules",
        "key": "module_id"
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
    tableName: 'users_privileges',
    timestamps: false,
    freezeTableName: true,
  });
}