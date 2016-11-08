'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _models = require('./models/');

var _models2 = _interopRequireDefault(_models);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _security = require('./security');

var _security2 = _interopRequireDefault(_security);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _setup = require('./setup');

var _setup2 = _interopRequireDefault(_setup);

var _apps = require('./libs/apps');

var _apps2 = _interopRequireDefault(_apps);

var _users = require('./libs/users');

var _users2 = _interopRequireDefault(_users);

var _tokens = require('./libs/tokens');

var _tokens2 = _interopRequireDefault(_tokens);

var _groups = require('./libs/groups');

var _groups2 = _interopRequireDefault(_groups);

var _modules = require('./libs/modules');

var _modules2 = _interopRequireDefault(_modules);

var _actions = require('./libs/actions');

var _actions2 = _interopRequireDefault(_actions);

var _groupsPrivileges = require('./libs/groupsPrivileges');

var _groupsPrivileges2 = _interopRequireDefault(_groupsPrivileges);

var _usersPrivileges = require('./libs/usersPrivileges');

var _usersPrivileges2 = _interopRequireDefault(_usersPrivileges);

var _scopes = require('./libs/scopes');

var _scopes2 = _interopRequireDefault(_scopes);

var _globalScopes = require('./libs/globalScopes');

var _globalScopes2 = _interopRequireDefault(_globalScopes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * La clase DcRbac encapsula los metodos necesario
 * para poder trabajar con el modelo RBAC definido
 * en la base de datos.
 *  
 */
var DcRbac = function () {
  /**
   * Crea una nueva instancia de DcRbac con opciones (ops).
   *
   * Opciones:
   *  dbConfig // db opciones
   *    port     // puerto de conexión
   *    database // nombre de la base de datos
   *    user     // nombre de usuario para conexión
   *    pwd      // contraseña de conexión
   *  logging  // habilita logs 
   *  
   * @param  {Object} ops Opciones
   * @return {Object}     Nueva instancia de la clase
   */
  function DcRbac(ops) {
    _classCallCheck(this, DcRbac);

    ops = ops || {};
    var db = ops.dbConfig || {};
    db.database = db.database || 'rbac';
    db.host = db.host || 'localhost';
    db.user = db.user || 'postgres';
    db.port = db.port || 5432;
    db.pwd = db.pwd || '';
    var logging = ops.logging || false;

    this.secret = ops.secret || '0198273498327465';

    this.security = new _security2.default({ secret: this.secret });

    this.sequelize = new _sequelize2.default(db.database, db.user, db.pwd, {
      host: db.host,
      dialect: "postgres",
      port: db.port,
      timestamps: false,
      logging: logging
    });

    this.models = new _models2.default(this.sequelize, _sequelize2.default);

    var database = db.database;
    var user = db.user;
    var pwd = db.pwd;
    var host = db.host;
    var port = db.port;
    var structure = _path2.default.resolve(_path2.default.join(__dirname, '../model/rbac.sql'));
    var functions = _path2.default.resolve(_path2.default.join(__dirname, '../model/rbac_functions.sql'));
    this.setup = (0, _setup2.default)({ database: database, user: user, pwd: pwd, host: host, port: port, structure: structure, functions: functions });
  }

  _createClass(DcRbac, [{
    key: 'apps',
    get: function get() {
      if (!this._apps) {
        this._apps = new _apps2.default(this);
      }
      return this._apps;
    }
  }, {
    key: 'modules',
    get: function get() {
      if (!this._modules) {
        this._modules = new _modules2.default(this);
      }
      return this._modules;
    }
  }, {
    key: 'groupsPrivileges',
    get: function get() {
      if (!this._groupsPrivileges) {
        this._groupsPrivileges = new _groupsPrivileges2.default(this);
      }
      return this._groupsPrivileges;
    }
  }, {
    key: 'usersPrivileges',
    get: function get() {
      if (!this._usersPrivileges) {
        this._usersPrivileges = new _usersPrivileges2.default(this);
      }
      return this._usersPrivileges;
    }
  }, {
    key: 'scopes',
    get: function get() {
      if (!this._scopes) {
        this._scopes = new _scopes2.default(this);
      }
      return this._scopes;
    }
  }, {
    key: 'globalScopes',
    get: function get() {
      if (!this._globalScopes) {
        this._globalScopes = new _globalScopes2.default(this);
      }
      return this._globalScopes;
    }
  }, {
    key: 'actions',
    get: function get() {
      if (!this._actions) {
        this._actions = new _actions2.default(this);
      }
      return this._actions;
    }
  }, {
    key: 'users',
    get: function get() {
      if (!this._users) {
        this._users = new _users2.default(this);
      }
      return this._users;
    }
  }, {
    key: 'tokens',
    get: function get() {
      if (!this._tokens) {
        this._tokens = new _tokens2.default(this);
      }
      return this._tokens;
    }
  }, {
    key: 'groups',
    get: function get() {
      if (!this._groups) {
        this._groups = new _groups2.default(this);
      }
      return this._groups;
    }
  }]);

  return DcRbac;
}();

exports.default = DcRbac;