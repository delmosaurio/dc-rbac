'use strict';
// import Auto_tokens from './tokens.auto.js';

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

var Auto_tokens = function () {
  function Auto_tokens(owner) {
    _classCallCheck(this, Auto_tokens);

    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }

  _createClass(Auto_tokens, [{
    key: 'create',
    value: function create(obj) {
      return _utils2.default.executeModel(this.sequelize, this.models.tokens, 'create', [obj]);
    }
  }, {
    key: 'update',
    value: function update(obj) {
      var token = obj.token;
      delete obj.token;
      var user_id_users = obj.user_id_users;
      delete obj.user_id_users;
      var where = {
        where: {
          token: token,
          user_id_users: user_id_users
        }
      };
      return _utils2.default.executeModel(this.sequelize, this.models.tokens, 'update', [obj, where]);
    }
  }, {
    key: 'delete',
    value: function _delete(obj) {
      var params = {
        token: obj.token,
        user_id_users: obj.user_id_users
      };
      var where = {
        where: params
      };
      return _utils2.default.executeModel(this.sequelize, this.models.tokens, 'destroy', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.tokens, 'findAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.tokens, 'findAndCountAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.tokens, 'findOne', [where]);
    }
  }, {
    key: 'getById',
    value: function getById(token, user_id_users) {
      var params = {
        token: token,
        user_id_users: user_id_users
      };
      return this.findOne(params);
    }
  }]);

  return Auto_tokens;
}();

exports.default = Auto_tokens;