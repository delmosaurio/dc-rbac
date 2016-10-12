// users
//
// user_id
// signon_type
// username
// email
// password
// user_salt
// user_state
// first_name
// last_name
// google_id
// account_image
// account_google_url
// updated_at
// created_at
export default function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    signon_type: {
      type: DataTypes.ENUM('local', 'google', 'facebook', 'twitter', 'github'),
      allowNull: false,
      defaultValue: "'local'",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_state: {
      type: DataTypes.ENUM('verifying', 'enabled', 'disabled'),
      allowNull: false,
      defaultValue: "'verifying'",
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    account_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    account_google_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'users',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
}