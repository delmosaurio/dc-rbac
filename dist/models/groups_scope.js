"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('groups_scope', {
    group_id_groups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "groups",
        "key": "group_id"
      }
    },
    target_table: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    scope_rule_grant: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    scope_rule_deny: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'groups_scope',
    timestamps: false,
    freezeTableName: true
  });
};