// objects
//
// object_id
// object_name
// application_id_applications
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
    application_id_applications: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "applications",
        "key": "application_id"
      },
    },
  }, {
    tableName: 'objects',
    timestamps: false,
    freezeTableName: true,
  });
}