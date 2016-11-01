"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('groups_privileges', {
    group_id_groups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "groups",
        "key": "group_id"
      }
    },
    action_id_actions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "actions",
        "key": "action_id"
      }
    },
    action_grant: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    action_deny: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'groups_privileges',
    timestamps: false,
    freezeTableName: true
  });
};