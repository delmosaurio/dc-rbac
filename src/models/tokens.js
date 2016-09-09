// tokens
//
// token
// user_id_users
// type
// expiration
// token_salt
export default function(sequelize, DataTypes) {
  return sequelize.define('tokens', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    user_id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "users",
        "key": "user_id"
      },
    },
    type: {
      type: DataTypes.ENUM('activation', 'password_change'),
      allowNull: false,
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token_salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'tokens',
    timestamps: false,
    freezeTableName: true,
  });
}