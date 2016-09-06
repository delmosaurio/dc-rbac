// profiles
//
// profile_id
// profile_name
export default function(sequelize, DataTypes) {
  return sequelize.define('profiles', {
    profile_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    profile_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'profiles',
    timestamps: false,
    freezeTableName: true,
  });
}