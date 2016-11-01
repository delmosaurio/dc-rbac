'use strict';

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {};

/**
 * Mapea propiedades visibles de un usuario.
 * 
 * @param  {Object} u Usuario
 * @return {Object}   Usuario
 */
utils.mapUserPublic = function (u) {
  delete u.password;
  delete u.user_salt;
  u.profile = { profile_id: u.profile_id_profiles };
  return u;
};

/**
 * Ejecuta una función para un model definido con una trasacción.
 * 
 * @param  {Object} fn       Nombre de la función
 * @return {Promise} 
 */
utils.executeModel = function (sequelize, owner, fn, params) {
  var def = _q2.default.defer();

  sequelize.transaction(function (t) {
    return owner[fn].apply(owner, params).then(function (o) {
      if (!o) {
        return def.resolve(null);
      }

      if (o.count !== undefined && o.rows !== undefined) {

        if (o.rows instanceof Array) {
          var mapped = _lodash2.default.map(o.rows, function (i) {
            return i.dataValues;
          });
          return def.resolve({
            count: o.count,
            rows: mapped
          });
        }
      }

      if (o.dataValues) {
        return def.resolve(o.dataValues, o);
      }

      if (o instanceof Array) {
        var mapped = _lodash2.default.map(o, function (i) {
          return i.dataValues;
        });
        return def.resolve(mapped);
      }

      def.resolve(o);
    }).catch(function (err) {
      def.reject(err);
    });
  });

  return def.promise;
};

/**
 * Ejecuta una función de la base de datos.
 * 
 * @param  {String} fn       Nombre de la función
 * @param  {Object}   params Parametros
 * @return {Promise} 
 */
utils.executeFn = function (sequelize, fn, params) {
  var def = _q2.default.defer();

  var replacements = Object.keys(params).map(function (p) {
    return ':' + p;
  });
  var rstr = replacements.join(',');

  sequelize.query('SELECT public.' + fn + '(' + rstr + ') as resul', {
    replacements: params,
    type: sequelize.QueryTypes.SELECT
  }).then(function (res) {
    var result = null;
    if (res.length > 0) {
      result = res[0].result;
    }
    def.resolve(result);
  }).catch(function (err) {
    def.reject(err);
  });

  return def.promise;
};

/**
 * Ejecuta una query en forma de select en la base de datos.
 * 
 * @param  {String} query Query
 * @param  {Object} params Parametros
 * @return {Promise} 
 */
utils.executeSelect = function (sequelize, query, replacements) {
  var def = _q2.default.defer();

  sequelize.query(query, {
    replacements: replacements,
    type: sequelize.QueryTypes.SELECT
  }).then(function (res) {
    def.resolve(res);
  }).catch(function (err) {
    def.reject(err);
  });

  return def.promise;
};

module.exports = utils;