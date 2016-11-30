"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('group_has_groups', {
    group_id_groups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        "model": null,
        "key": null
      }
    },
    has_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        "model": "groups",
        "key": "group_id"
      }
    }
  }, {
    tableName: 'group_has_groups',
    timestamps: false,
    freezeTableName: true
  });
};