'use strict';
// import Auto_actions from './actions.auto.js';

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

var Auto_actions = function () {
  function Auto_actions(owner) {
    _classCallCheck(this, Auto_actions);

    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }

  _createClass(Auto_actions, [{
    key: 'create',
    value: function create(obj) {
      return _utils2.default.executeModel(this.sequelize, this.models.actions, 'create', [obj]);
    }
  }, {
    key: 'update',
    value: function update(obj) {
      var action_id = obj.action_id;
      delete obj.action_id;
      var module_id_modules = obj.module_id_modules;
      delete obj.module_id_modules;
      var where = {
        where: {
          action_id: action_id,
          module_id_modules: module_id_modules
        }
      };
      return _utils2.default.executeModel(this.sequelize, this.models.actions, 'update', [obj, where]);
    }
  }, {
    key: 'delete',
    value: function _delete(obj) {
      var params = {
        action_id: obj.action_id,
        module_id_modules: obj.module_id_modules
      };
      var where = {
        where: params
      };
      return _utils2.default.executeModel(this.sequelize, this.models.actions, 'destroy', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.actions, 'findAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.actions, 'findAndCountAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.actions, 'findOne', [where]);
    }
  }, {
    key: 'getById',
    value: function getById(action_id, module_id_modules) {
      var params = {
        action_id: action_id,
        module_id_modules: module_id_modules
      };
      return this.findOne(params);
    }
  }]);

  return Auto_actions;
}();

exports.default = Auto_actions;