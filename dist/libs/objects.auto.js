'use strict';
// import Auto_objects from './objects.auto.js';

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

var Auto_objects = function () {
  function Auto_objects(owner) {
    _classCallCheck(this, Auto_objects);

    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }

  _createClass(Auto_objects, [{
    key: 'create',
    value: function create(obj) {
      return _utils2.default.executeModel(this.sequelize, this.models.objects, 'create', [obj]);
    }
  }, {
    key: 'update',
    value: function update(obj) {
      var object_id = obj.object_id;
      delete obj.object_id;
      var object_type = obj.object_type;
      delete obj.object_type;
      var where = {
        where: {
          object_id: object_id,
          object_type: object_type
        }
      };
      return _utils2.default.executeModel(this.sequelize, this.models.objects, 'update', [obj, where]);
    }
  }, {
    key: 'delete',
    value: function _delete(obj) {
      var params = {
        object_id: obj.object_id,
        object_type: obj.object_type
      };
      var where = {
        where: params
      };
      return _utils2.default.executeModel(this.sequelize, this.models.objects, 'destroy', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.objects, 'findAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.objects, 'findAndCountAll', [where]);
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
      return _utils2.default.executeModel(this.sequelize, this.models.objects, 'findOne', [where]);
    }
  }, {
    key: 'getById',
    value: function getById(object_id, object_type) {
      var params = {
        object_id: object_id,
        object_type: object_type
      };
      return this.findOne(params);
    }
  }]);

  return Auto_objects;
}();

exports.default = Auto_objects;