// objects
//
// object_id
// object_name
export default function(sequelize, DataTypes) {
  return sequelize.define('objects', {
    object_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    object_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'objects',
    timestamps: false,
    freezeTableName: true,
  });
}