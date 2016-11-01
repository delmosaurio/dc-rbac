'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('groups', {
    group_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    group_description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'groups',
    timestamps: false,
    freezeTableName: true
  });
};