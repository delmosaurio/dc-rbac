'use strict';
// import Auto_groupScopes from './groupScopes.auto.js';

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

var Auto_groupScopes = function () {
  function Auto_groupScopes(owner) {
    _classCallCheck(this, Auto_groupScopes);

    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }

  _createClass(Auto_groupScopes, [{
    key: 'create',
    value: function create(obj) {
      return _utils2.default.executeModel(this.sequelize, this.models.groupScopes, 'create', [obj]);
    }
  }, {
    key: 'update',
    value: function update(obj) {
      var group_id_groups = obj.group_id_groups;
      delete obj.group_id_groups;
      var object_id_objects = obj.object_id_objects;
      delete obj.object_id_objects;
      var where = {
        where: {
          group_id_groups: group_id_groups,
          object_id_objects: object_id_objects
        }
      };
      return _utils2.default.executeModel(this.sequelize, this.models.groupScopes, 'update', [obj, where]);
    }
  }, {
    key: 'delete',
    value: function _delete(obj) {
      var params = {
        group_id_groups: obj.group_id_groups,
        object_id_objects: obj.object_id_objects
      };
      var where = {
        where: params
      };
      return _utils2.default.executeModel(this.sequelize, this.models.groupScopes, 'destroy', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.groupScopes, 'findAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.groupScopes, 'findAndCountAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.groupScopes, 'findOne', [where]);
    }
  }, {
    key: 'getById',
    value: function getById(group_id_groups, object_id_objects) {
      var params = {
        group_id_groups: group_id_groups,
        object_id_objects: object_id_objects
      };
      return this.findOne(params);
    }
  }]);

  return Auto_groupScopes;
}();

exports.default = Auto_groupScopes;