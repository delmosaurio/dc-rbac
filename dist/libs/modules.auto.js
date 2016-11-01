'use strict';
// import Auto_modules from './modules.auto.js';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auto_modules = function () {
  function Auto_modules(owner) {
    _classCallCheck(this, Auto_modules);

    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }

  _createClass(Auto_modules, [{
    key: 'create',
    value: function create(obj) {
      return _utils2.default.executeModel(this.sequelize, this.models.modules, 'create', [obj]);
    }
  }, {
    key: 'update',
    value: function update(obj) {
      var app_id_apps = obj.app_id_apps;
      delete obj.app_id_apps;
      var module_id = obj.module_id;
      delete obj.module_id;
      var where = {
        where: {
          app_id_apps: app_id_apps,
          module_id: module_id
        }
      };
      return _utils2.default.executeModel(this.sequelize, this.models.modules, 'update', [obj, where]);
    }
  }, {
    key: 'delete',
    value: function _delete(obj) {
      var params = {
        app_id_apps: obj.app_id_apps,
        module_id: obj.module_id
      };
      var where = {
        where: params
      };
      return _utils2.default.executeModel(this.sequelize, this.models.modules, 'destroy', [where]);
    }
  }, {
    key: 'findAll',
    value: function findAll(filters, notWhere) {
      filters = filters || {};
      var where = {
        where: filters
      };
      if (notWhere) {
        where = filters;
      }
      return _utils2.default.executeModel(this.sequelize, this.models.modules, 'findAll', [where]);
    }
  }, {
    key: 'findAndCountAll',
    value: function findAndCountAll(filters, notWhere) {
      filters = filters || {};
      var where = {
        where: filters
      };
      if (notWhere) {
        where = filters;
      }
      return _utils2.default.executeModel(this.sequelize, this.models.modules, 'findAndCountAll', [where]);
    }
  }, {
    key: 'findOne',
    value: function findOne(params, notWhere) {
      var where = {
        where: params
      };
      if (notWhere) {
        where = params;
      }
      return _utils2.default.executeModel(this.sequelize, this.models.modules, 'findOne', [where]);
    }
  }, {
    key: 'getById',
    value: function getById(app_id_apps, module_id) {
      var params = {
        app_id_apps: app_id_apps,
        module_id: module_id
      };
      return this.findOne(params);
    }
  }]);

  return Auto_modules;
}();

exports.default = Auto_modules;