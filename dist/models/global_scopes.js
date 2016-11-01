"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('global_scopes', {
    group_id_groups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "groups",
        "key": "group_id"
      }
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    target_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rule_access: {
      type: DataTypes.JSON,
      allowNull: true
    },
    rule_deny: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'global_scopes',
    timestamps: false,
    freezeTableName: true
  });
};