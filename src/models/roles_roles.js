// roles_roles
//
// role_id_roles
// roles_role_id
export default function(sequelize, DataTypes) {
  return sequelize.define('roles_roles', {
    role_id_roles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "roles",
        "key": "role_id"
      },
    },
    roles_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "roles",
        "key": "role_id"
      },
    },
  }, {
    tableName: 'roles_roles',
    timestamps: false,
    freezeTableName: true,
  });
}