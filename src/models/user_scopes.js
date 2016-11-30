// user_scopes
//
// user_id_users
// object_id_objects
// access_grant
// access_deny
export default function(sequelize, DataTypes) {
  return sequelize.define('user_scopes', {
    user_id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": null,
        "key": null
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
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    access_deny: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'user_scopes',
    timestamps: false,
    freezeTableName: true,
  });
}