// users_roles
//
// user_id_users
// role_id_roles
export default function(sequelize, DataTypes) {
  return sequelize.define('users_roles', {
    user_id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "users",
        "key": "user_id"
      },
    },
    role_id_roles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "roles",
        "key": "role_id"
      },
    },
  }, {
    tableName: 'users_roles',
    timestamps: false,
    freezeTableName: true,
  });
}