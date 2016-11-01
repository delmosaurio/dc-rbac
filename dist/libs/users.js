'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _usersAuto = require('./users.auto.js');

var _usersAuto2 = _interopRequireDefault(_usersAuto);

var _groups = require('./groups.js');

var _groups2 = _interopRequireDefault(_groups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _map(item) {
  if (!item) {
    return null;
  }
  if (item instanceof Array) {
    return item.map(function (i) {
      delete i.password;
      delete i.user_salt;
      return i;
    });
  }

  delete item.password;
  delete item.user_salt;
  return item;
}

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla users.
 */

var Users = function (_Auto_users) {
  _inherits(Users, _Auto_users);

  function Users(owner) {
    _classCallCheck(this, Users);

    var _this = _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).call(this, owner));

    _this.groups = new _groups2.default(owner);
    _this.memberships = _this.groups.memberships;
    return _this;
  }

  // Override methods


  _createClass(Users, [{
    key: 'create',
    value: function create(obj) {
      var def = _q2.default.defer();
      _get(Users.prototype.__proto__ || Object.getPrototypeOf(Users.prototype), 'create', this).call(this, obj).then(function (res) {
        def.resolve(_map(res));
      }).catch(function (err) {
        def.reject(err);
      });
      return def.promise;
    }
  }, {
    key: 'update',
    value: function update(obj) {
      delete obj.password;
      return _get(Users.prototype.__proto__ || Object.getPrototypeOf(Users.prototype), 'update', this).call(this, obj);
    }
  }, {
    key: 'findAll',
    value: function findAll(filters, notWhere) {
      var def = _q2.default.defer();
      _get(Users.prototype.__proto__ || Object.getPrototypeOf(Users.prototype), 'findAll', this).call(this, filters, notWhere).then(function (res) {
        def.resolve(_map(res));
      }).catch(function (err) {
        def.reject(err);
      });
      return def.promise;
    }
  }, {
    key: 'findAndCountAll',
    value: function findAndCountAll(filters, notWhere) {
      var def = _q2.default.defer();
      _get(Users.prototype.__proto__ || Object.getPrototypeOf(Users.prototype), 'findAndCountAll', this).call(this, filters, notWhere).then(function (res) {
        def.resolve({
          count: res.count,
          rows: _map(res.rows)
        });
      }).catch(function (err) {
        def.reject(err);
      });
      return def.promise;
    }
  }, {
    key: 'findOne',
    value: function findOne(params, notWhere) {
      var def = _q2.default.defer();
      _get(Users.prototype.__proto__ || Object.getPrototypeOf(Users.prototype), 'findOne', this).call(this, params, notWhere).then(function (res) {
        def.resolve(_map(res));
      }).catch(function (err) {
        def.reject(err);
      });
      return def.promise;
    }
  }, {
    key: 'register',
    value: function register(user) {

      user.signon_type = user.signon_type || 'local';
      user.user_state = user.user_state || 'verifying';
      user.force_change_password = user.force_change_password || false;
      var pwdObj = this.security.generatePassword(user.password);
      user.password = pwdObj.hash;
      user.user_salt = pwdObj.salt;

      return this.create(user);
    }
  }, {
    key: 'getByUsernameOrEmail',
    value: function getByUsernameOrEmail(username) {
      var params = { $or: [{ username: username }, { email: username }] };
      return this.findOne(params);
    }
  }, {
    key: 'getByGoogleId',
    value: function getByGoogleId(googlId) {
      var params = { google_id: googlId };
      return this.findOne(params);
    }
  }, {
    key: 'changePassword',
    value: function changePassword(userId, newPassword) {
      var pwdObj = this.security.generatePassword(newPassword);

      var salt = pwdObj.salt;
      var pwd = pwdObj.hash;

      var user = {
        user_id: userId,
        password: pwd,
        user_salt: salt
      };

      return _get(Users.prototype.__proto__ || Object.getPrototypeOf(Users.prototype), 'update', this).call(this, user);
    }
  }, {
    key: 'enable',
    value: function enable(userId) {
      var user = {
        user_id: userId,
        user_state: 'enabled'
      };

      return this.update(user);
    }
  }, {
    key: 'disable',
    value: function disable(userId) {
      var user = {
        user_id: userId,
        user_state: 'disabled'
      };

      return this.update(user);
    }
  }, {
    key: 'authenticate',
    value: function authenticate(username, pwd) {
      var _this2 = this;

      var def = _q2.default.defer();

      var params = { $or: [{ username: username }, { email: username }] };

      _get(Users.prototype.__proto__ || Object.getPrototypeOf(Users.prototype), 'findOne', this).call(this, params).then(function (user) {
        if (!user) {
          return def.reject(new Error('Unknown user'));
        }

        if (user.user_state !== 'enabled') {
          return def.reject(new Error('The user is not enabled'));
        }

        var savedpwd = user.password;
        var salt = user.user_salt;

        try {
          var cp = _this2.security.comparePassword(pwd, savedpwd);

          if (cp) {
            return def.resolve(_map(user));
          }
          return def.reject(new Error('Wrong password'));
        } catch (err) {
          return def.reject(err);
        }
      }).catch(function (err) {
        def.reject(err);
      });

      return def.promise;
    }
  }, {
    key: 'getGroups',
    value: function getGroups(userId) {
      var _this3 = this;

      var def = _q2.default.defer();

      _async2.default.waterfall([function (cb) {
        var params = { user_id_users: userId };

        _this3.memberships.findAll(params).then(function (res) {
          if (res.length === 0) {
            return def.resolve([]);
          }

          var gids = res.map(function (ge) {
            return ge.group_id_groups;
          });

          cb(null, gids);
        }).catch(cb);
      }, function (gids, cb) {
        var params = { group_id: { $in: gids } };

        _this3.groups.findAll(params).then(function (res) {
          cb(null, res);
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
    key: 'getGroupsAll',
    value: function getGroupsAll(userId) {
      var _this4 = this;

      var def = _q2.default.defer();

      _async2.default.waterfall([function (cb) {
        var params = { user_id_users: userId };

        _this4.memberships.findAll(params).then(function (res) {
          if (res.length === 0) {
            return def.resolve([]);
          }

          var gids = res.map(function (ge) {
            return ge.group_id_groups;
          });

          cb(null, gids);
        }).catch(cb);
      }, function (gids, cb) {

        _this4.groups.getGroupsFor(gids).then(function (res) {
          var ids = res.map(function (r) {
            return r.has_group_id;
          });
          cb(null, gids, ids);
        }).catch(cb);
      }, function (gids, cgids, cb) {
        var params = { group_id: { $in: cgids } };

        _this4.groups.findAll(params).then(function (res) {
          res = res.map(function (r) {
            r.inherits = true;
            return r;
          });
          cb(null, gids, res);
        }).catch(cb);
      }, function (gids, childs, cb) {
        var params = { group_id: { $in: gids } };

        _this4.groups.findAll(params).then(function (res) {

          // filter repeat groups
          var filtered = _lodash2.default.filter(childs, function (c) {
            return gids.indexOf(c.group_id) === -1;
          });

          var result = res.concat(filtered);
          cb(null, result);
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

  return Users;
}(_usersAuto2.default);

exports.default = Users;