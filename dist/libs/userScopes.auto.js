'use strict';
// import Auto_userScopes from './userScopes.auto.js';

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

var Auto_userScopes = function () {
  function Auto_userScopes(owner) {
    _classCallCheck(this, Auto_userScopes);

    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }

  _createClass(Auto_userScopes, [{
    key: 'create',
    value: function create(obj) {
      return _utils2.default.executeModel(this.sequelize, this.models.userScopes, 'create', [obj]);
    }
  }, {
    key: 'update',
    value: function update(obj) {
      var object_id_objects = obj.object_id_objects;
      delete obj.object_id_objects;
      var user_id_users = obj.user_id_users;
      delete obj.user_id_users;
      var where = {
        where: {
          object_id_objects: object_id_objects,
          user_id_users: user_id_users
        }
      };
      return _utils2.default.executeModel(this.sequelize, this.models.userScopes, 'update', [obj, where]);
    }
  }, {
    key: 'delete',
    value: function _delete(obj) {
      var params = {
        object_id_objects: obj.object_id_objects,
        user_id_users: obj.user_id_users
      };
      var where = {
        where: params
      };
      return _utils2.default.executeModel(this.sequelize, this.models.userScopes, 'destroy', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.userScopes, 'findAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.userScopes, 'findAndCountAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.userScopes, 'findOne', [where]);
    }
  }, {
    key: 'getById',
    value: function getById(object_id_objects, user_id_users) {
      var params = {
        object_id_objects: object_id_objects,
        user_id_users: user_id_users
      };
      return this.findOne(params);
    }
  }]);

  return Auto_userScopes;
}();

exports.default = Auto_userScopes;