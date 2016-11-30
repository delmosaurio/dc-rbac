// objects
//
// object_id
// object_type
// target_id
// object_description
export default function(sequelize, DataTypes) {
  return sequelize.define('objects', {
    object_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    object_type: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        "model": "object_types",
        "key": "object_type_id"
      },
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    object_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'objects',
    timestamps: false,
    freezeTableName: true,
  });
}