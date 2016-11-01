'use strict';
// import Auto_scopes from './scopes.auto.js';

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

var Auto_scopes = function () {
  function Auto_scopes(owner) {
    _classCallCheck(this, Auto_scopes);

    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }

  _createClass(Auto_scopes, [{
    key: 'create',
    value: function create(obj) {
      return _utils2.default.executeModel(this.sequelize, this.models.scopes, 'create', [obj]);
    }
  }, {
    key: 'update',
    value: function update(obj) {
      var group_id_groups = obj.group_id_groups;
      delete obj.group_id_groups;
      var target = obj.target;
      delete obj.target;
      var user_id_users = obj.user_id_users;
      delete obj.user_id_users;
      var where = {
        where: {
          group_id_groups: group_id_groups,
          target: target,
          user_id_users: user_id_users
        }
      };
      return _utils2.default.executeModel(this.sequelize, this.models.scopes, 'update', [obj, where]);
    }
  }, {
    key: 'delete',
    value: function _delete(obj) {
      var params = {
        group_id_groups: obj.group_id_groups,
        target: obj.target,
        user_id_users: obj.user_id_users
      };
      var where = {
        where: params
      };
      return _utils2.default.executeModel(this.sequelize, this.models.scopes, 'destroy', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.scopes, 'findAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.scopes, 'findAndCountAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.scopes, 'findOne', [where]);
    }
  }, {
    key: 'getById',
    value: function getById(group_id_groups, target, user_id_users) {
      var params = {
        group_id_groups: group_id_groups,
        target: target,
        user_id_users: user_id_users
      };
      return this.findOne(params);
    }
  }]);

  return Auto_scopes;
}();

exports.default = Auto_scopes;