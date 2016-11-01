"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('scopes', {
    user_id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "users",
        "key": "user_id"
      }
    },
    group_id_groups: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'scopes',
    timestamps: false,
    freezeTableName: true
  });
};