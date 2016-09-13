// brute
//
// id
// count
// first_request
// last_request
// expires
export default function(sequelize, DataTypes) {
  return sequelize.define('brute', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    first_request: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_request: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'brute',
    timestamps: false,
    freezeTableName: true,
  });
}