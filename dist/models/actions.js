"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('actions', {
    action_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: true
    },
    module_id_modules: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "modules",
        "key": "module_id"
      }
    },
    action_caption: {
      type: DataTypes.STRING,
      allowNull: true
    },
    action_description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'actions',
    timestamps: false,
    freezeTableName: true
  });
};