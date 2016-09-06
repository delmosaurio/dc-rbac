// users_objects
//
// user_id_users
// object_id_objects
// access_grant
// access_deny
export default function(sequelize, DataTypes) {
  return sequelize.define('users_objects', {
    user_id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "users",
        "key": "user_id"
      },
    },
    object_id_objects: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "objects",
        "key": "object_id"
      },
    },
    access_grant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    access_deny: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'users_objects',
    timestamps: false,
    freezeTableName: true,
  });
}