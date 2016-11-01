'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ops) {
  return function (callback) {
    var def = _q2.default.defer();

    var conStringPri = 'postgres://' + ops.user + ':' + ops.pwd + '@' + ops.host + ':' + ops.port + '/postgres';
    var conStringPost = 'postgres://' + ops.user + ':' + ops.pwd + '@' + ops.host + ':' + ops.port + '/' + ops.database;

    _async2.default.waterfall([function (cb) {
      var script = 'SELECT 1 FROM pg_database WHERE datname=\'' + ops.database + '\';';
      executeScript(conStringPri, script, function (err, result) {
        if (err) {
          return cb(err);
        }
        if (result.rowCount > 0) {
          return cb(new Error('Database exists.'));
        }
        // if not exists create 
        return cb(null, true);
      });
    }, function (create, cb) {
      if (!create) {
        return cb(null, create);
      }
      var script = 'CREATE DATABASE ' + ops.database + ';';

      executeScript(conStringPri, script, function (err, result) {
        if (err) {
          return cb(err);
        }
        // if not exists create 
        return cb(null, create);
      });
    }, function (create, cb) {
      if (!create) {
        return cb(null, create);
      }

      var script = _fs2.default.readFileSync(ops.structure, 'utf-8');
      executeScript(conStringPost, script, function (err, result) {
        return cb(err, create);
      });
    }, function (create, cb) {
      if (!create) {
        return cb(null);
      }

      var script = _fs2.default.readFileSync(ops.functions, 'utf-8');
      executeScript(conStringPost, script, function (err, result) {
        return cb(err, create);
      });
    }], function (err) {
      if (err) {
        return def.reject(err);
      }
      def.resolve(true);
    });

    return def.promise;
  };

  // execut an pg script
  function executeScript(connString, script, cb) {
    _pg2.default.connect(connString, function (err, client, done) {
      if (err) {
        return cb(err);
      }
      client.query(script, function (err, result) {
        try {
          client.end(); // close the connection
        } catch (ex) {
          return cb(err);
        }

        if (err) {
          return cb(err);
        }

        cb(null, result);
      });
    });
  }
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }