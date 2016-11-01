"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('users_scope', {
    user_id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": "users",
        "key": "user_id"
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
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'users_scope',
    timestamps: false,
    freezeTableName: true
  });
};