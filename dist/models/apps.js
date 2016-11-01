'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('apps', {
    app_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    app: {
      type: DataTypes.STRING,
      allowNull: true
    },
    app_caption: {
      type: DataTypes.STRING,
      allowNull: false
    },
    app_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_secret: {
      type: DataTypes.STRING,
      allowNull: false
    },
    redirect_uris: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'apps',
    timestamps: false,
    freezeTableName: true
  });
};