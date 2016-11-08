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

var _usersPrivilegesAuto = require('./usersPrivileges.auto.js');

var _usersPrivilegesAuto2 = _interopRequireDefault(_usersPrivilegesAuto);

var _actions = require('./actions.js');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsersPrivileges = function (_Auto_usersPrivileges) {
  _inherits(UsersPrivileges, _Auto_usersPrivileges);

  function UsersPrivileges(owner) {
    _classCallCheck(this, UsersPrivileges);

    var _this = _possibleConstructorReturn(this, (UsersPrivileges.__proto__ || Object.getPrototypeOf(UsersPrivileges)).call(this, owner));

    _this.actions = new _actions2.default(owner);
    return _this;
  }

  _createClass(UsersPrivileges, [{
    key: 'actionsFor',
    value: function actionsFor(userId) {
      var _this2 = this;

      var def = _q2.default.defer();

      _async2.default.waterfall([function (cb) {
        _this2.findAll({ user_id_users: userId }).then(function (privs) {
          cb(null, privs);
        }).catch(cb);
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

  return UsersPrivileges;
}(_usersPrivilegesAuto2.default);

exports.default = UsersPrivileges;