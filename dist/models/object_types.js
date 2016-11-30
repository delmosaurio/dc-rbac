'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('object_types', {
    object_type_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    target_table: {
      type: DataTypes.STRING,
      allowNull: true
    },
    target_id_field: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'object_types',
    timestamps: false,
    freezeTableName: true
  });
};