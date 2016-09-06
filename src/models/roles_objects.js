// roles_objects
//
// role_id_roles
// object_id_objects
// access_grant
// access_deny
export default function(sequelize, DataTypes) {
  return sequelize.define('roles_objects', {
    role_id_roles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "roles",
        "key": "role_id"
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
    tableName: 'roles_objects',
    timestamps: false,
    freezeTableName: true,
  });
}