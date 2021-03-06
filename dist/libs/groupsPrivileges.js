'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _groupsPrivilegesAuto = require('./groupsPrivileges.auto.js');

var _groupsPrivilegesAuto2 = _interopRequireDefault(_groupsPrivilegesAuto);

var _groups = require('./groups.js');

var _groups2 = _interopRequireDefault(_groups);

var _actions = require('./actions.js');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
var GroupsPrivileges = function (_Auto_groupsPrivilege) {
  _inherits(GroupsPrivileges, _Auto_groupsPrivilege);

  function GroupsPrivileges(owner) {
    _classCallCheck(this, GroupsPrivileges);

    var _this = _possibleConstructorReturn(this, (GroupsPrivileges.__proto__ || Object.getPrototypeOf(GroupsPrivileges)).call(this, owner));

    _this.groups = new _groups2.default(owner);
    _this.actions = new _actions2.default(owner);
    return _this;
  }

  _createClass(GroupsPrivileges, [{
    key: 'actionsFor',
    value: function actionsFor(groupId) {
      var _this2 = this;

      var def = _q2.default.defer();

      _async2.default.waterfall([function (cb) {
        _this2.findAll({ group_id_groups: groupId }).then(function (privs) {
          cb(null, privs);
        }).catch(cb);
      }, function (privs, cb) {
        _this2.groups.getGroupsAll(groupId).then(function (groups) {
          cb(null, privs, groups);
        }).catch(cb);
      }, function (privs, groups, cb) {
        _async2.default.concat(groups, function (g, icb) {
          _this2.findAll({ group_id_groups: g.group_id }).then(function (privs) {
            privs = _lodash2.default.map(privs, function (p) {
              p.inherits = g;
              return p;
            });
            icb(null, privs);
          }).catch(icb);
        }, function (err, results) {
          if (err) {
            return cb(err);
          }
          cb(null, privs, results);
        });
      }, function (group, inherits, cb) {
        var actions = group.concat(inherits);
        cb(null, actions);
      }, function (actions, cb) {
        _this2.actions.populate(actions).then(function (results) {
          cb(null, results);
        }).catch(cb);
      }], function (err, results) {
        if (err) {
          return def.reject(err);
        }
        def.resolve(results);
      });

      return def.promise;
    }
  }]);

  return GroupsPrivileges;
}(_groupsPrivilegesAuto2.default);

exports.default = GroupsPrivileges;