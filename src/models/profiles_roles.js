// profiles_roles
//
// profile_id_profiles
// role_id_roles
export default function(sequelize, DataTypes) {
  return sequelize.define('profiles_roles', {
    profile_id_profiles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "profiles",
        "key": "profile_id"
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
    tableName: 'profiles_roles',
    timestamps: false,
    freezeTableName: true,
  });
}