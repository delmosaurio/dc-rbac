// applications
//
// application_id
// application_name
export default function(sequelize, DataTypes) {
  return sequelize.define('applications', {
    application_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    application_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'applications',
    timestamps: false,
    freezeTableName: true,
  });
}