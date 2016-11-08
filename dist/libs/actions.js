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

var _actionsAuto = require('./actions.auto.js');

var _actionsAuto2 = _interopRequireDefault(_actionsAuto);

var _apps = require('./apps.js');

var _apps2 = _interopRequireDefault(_apps);

var _modules = require('./modules.js');

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
var Actions = function (_Auto_actions) {
  _inherits(Actions, _Auto_actions);

  function Actions(owner) {
    _classCallCheck(this, Actions);

    var _this = _possibleConstructorReturn(this, (Actions.__proto__ || Object.getPrototypeOf(Actions)).call(this, owner));

    _this.apps = new _apps2.default(owner);
    _this.modules = new _modules2.default(owner);
    return _this;
  }

  _createClass(Actions, [{
    key: 'populate',
    value: function populate(actions) {
      var _this2 = this;

      var def = _q2.default.defer();

      _async2.default.waterfall([function (cb) {
        var ids = _lodash2.default.map(actions, function (a) {
          return a.action_id_actions;
        });

        var where = {
          action_id: {
            '$in': ids
          }
        };

        _this2.findAll(where).then(function (all) {
          all = _lodash2.default.map(all, function (a) {
            var aa = _lodash2.default.find(actions, { action_id_actions: a.action_id });
            a.action_grant = aa.action_grant;
            a.action_deny = aa.action_deny;
            a.group_id_groups = aa.group_id_groups;
            a.inherits = aa.inherits;
            return a;
          });
          cb(null, all);
        }).catch(cb);
      }, function (actions, cb) {
        var ids = _lodash2.default.map(actions, function (a) {
          return a.module_id_modules;
        });
        var where = {
          module_id: {
            '$in': ids
          }
        };
        _this2.modules.findAll(where).then(function (modules) {
          cb(null, actions, modules);
        }).catch(cb);
      }, function (actions, modules, cb) {
        var ids = _lodash2.default.map(modules, function (m) {
          return m.app_id_apps;
        });
        var where = {
          app_id: {
            '$in': ids
          }
        };
        _this2.apps.findAll(where).then(function (apps) {

          var mresults = _lodash2.default.map(modules, function (mm) {
            var app = _lodash2.default.find(apps, { app_id: mm.app_id_apps });
            mm.app = app;
            return mm;
          });
          var results = _lodash2.default.map(actions, function (a) {
            var m = _lodash2.default.find(mresults, { module_id: a.module_id_modules });
            a.module = m;
            return a;
          });

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
  }, {
    key: 'resolveAction',
    value: function resolveAction(_app, _module, _action) {
      var _this3 = this;

      var def = _q2.default.defer();

      _async2.default.waterfall([function (cb) {
        _this3.apps.findOne({ app: _app }).then(function (app) {
          cb(null, app);
        }).catch(cb);
      }, function (app, cb) {
        _this3.modules.findOne({ module: _module, app_id_apps: app.app_id }).then(function (module) {
          module.app = app;
          cb(null, module);
        }).catch(cb);
      }, function (module, cb) {
        _this3.findOne({ action: _action, module_id_modules: module.module_id }).then(function (action) {
          action.module = module;
          cb(null, action);
        }).catch(cb);
      }], function (err, result) {
        if (err) {
          return def.reject(err);
        }
        def.resolve(result);
      });

      return def.promise;
    }
  }]);

  return Actions;
}(_actionsAuto2.default);

exports.default = Actions;