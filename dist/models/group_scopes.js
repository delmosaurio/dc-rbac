"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('group_scopes', {
    group_id_groups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": null,
        "key": null
      }
    },
    object_id_objects: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "objects",
        "key": "object_id"
      }
    },
    access_grant: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    access_deny: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'group_scopes',
    timestamps: false,
    freezeTableName: true
  });
};