// roles
//
// role_id
// role_name
export default function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'roles',
    timestamps: false,
    freezeTableName: true,
  });
}