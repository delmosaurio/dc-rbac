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

var _groupsAuto = require('./groups.auto.js');

var _groupsAuto2 = _interopRequireDefault(_groupsAuto);

var _groupHasGroupsAuto = require('./groupHasGroups.auto.js');

var _groupHasGroupsAuto2 = _interopRequireDefault(_groupHasGroupsAuto);

var _groupsMembershipsAuto = require('./groupsMemberships.auto.js');

var _groupsMembershipsAuto2 = _interopRequireDefault(_groupsMembershipsAuto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla groups.
 */
var Groups = function (_Auto_groups) {
  _inherits(Groups, _Auto_groups);

  function Groups(owner) {
    _classCallCheck(this, Groups);

    var _this = _possibleConstructorReturn(this, (Groups.__proto__ || Object.getPrototypeOf(Groups)).call(this, owner));

    _this.groupsHas = new _groupHasGroupsAuto2.default(owner);
    _this.memberships = new _groupsMembershipsAuto2.default(owner);
    return _this;
  }

  _createClass(Groups, [{
    key: '_getGroupsFor',
    value: function _getGroupsFor(groupId, results, cb) {
      var _this2 = this;

      if (typeof results === 'function') {
        cb = results;
        results = [];
      }

      var params;

      if (groupId instanceof Array) {
        params = { group_id_groups: { $in: groupId } };
      } else {
        params = { group_id_groups: groupId };
      }

      this.groupsHas.findAll(params).then(function (childs) {

        if (childs.length === 0) {
          return cb(null, results);
        }

        _async2.default.concat(childs, function (item, icb) {
          _this2._getGroupsFor(item.has_group_id, results, icb);
        }, function (perr, cc) {
          if (perr) {
            return cb(perr);
          }
          //results = results.concat(cc);
          results = results.concat(childs, cc);
          cb(null, results);
        });
      }).catch(function (err) {
        cb(err);
      });
    }
  }, {
    key: 'getGroupsFor',
    value: function getGroupsFor(groupId) {
      var def = _q2.default.defer();

      this._getGroupsFor(groupId, function (err, theResults) {
        if (err) {
          return def.reject(err);
        }
        def.resolve(theResults);
      });

      return def.promise;
    }
  }, {
    key: 'getMemberships',
    value: function getMemberships(groupId) {
      var def = _q2.default.defer();

      var params = { group_id_groups: groupId };
      return this.memberships.findAll(params);

      return def.promise;
    }
  }, {
    key: 'getGroups',
    value: function getGroups(groupId) {
      var _this3 = this;

      var def = _q2.default.defer();

      _async2.default.waterfall([function (cb) {
        var params = { group_id_groups: groupId };

        _this3.groupsHas.findAll(params).then(function (res) {
          if (res.length === 0) {
            return def.resolve([]);
          }

          var gids = res.map(function (ge) {
            return ge.has_group_id;
          });

          cb(null, gids);
        }).catch(cb);
      }, function (gids, cb) {
        var params = { group_id: { $in: gids } };

        _this3.findAll(params).then(function (res) {
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
    value: function getGroupsAll(groupId) {
      var _this4 = this;

      var def = _q2.default.defer();

      _async2.default.waterfall([function (cb) {
        var params = { group_id_groups: groupId };

        _this4.groupsHas.findAll(params).then(function (res) {
          if (res.length === 0) {
            return def.resolve([]);
          }

          var gids = res.map(function (ge) {
            return ge.has_group_id;
          });

          cb(null, gids);
        }).catch(cb);
      }, function (gids, cb) {
        _this4.getGroupsFor(gids).then(function (res) {
          var ids = res.map(function (r) {
            return r.has_group_id;
          });
          cb(null, gids, ids);
        }).catch(cb);
      }, function (gids, cgids, cb) {
        var params = { group_id: { $in: cgids } };

        _this4.findAll(params).then(function (res) {
          res = res.map(function (r) {
            r.inherits = true;
            return r;
          });
          cb(null, gids, res);
        }).catch(cb);
      }, function (gids, childs, cb) {
        var params = { group_id: { $in: gids } };

        _this4.findAll(params).then(function (res) {

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

  return Groups;
}(_groupsAuto2.default);

exports.default = Groups;