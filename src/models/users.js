// users
//
// user_id
// profile_id_profiles
// signon_type
// username
// email
// password
// salt
// user_state
export default function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    profile_id_profiles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "profiles",
        "key": "profile_id"
      },
    },
    signon_type: {
      type: DataTypes.ENUM('local', 'google', 'facebook', 'twitter', 'github'),
      allowNull: false,
      defaultValue: "local",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_state: {
      type: DataTypes.ENUM('verifying', 'enabled', 'disabled'),
      allowNull: false,
      defaultValue: "verifying",
    },
  }, {
    tableName: 'users',
    timestamps: false,
    freezeTableName: true,
  });
}