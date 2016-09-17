'use strict';

import Q from 'q';

var utils = {};

/**
 * Mapea propiedades visibles de un usuario.
 * 
 * @param  {Object} u Usuario
 * @return {Object}   Usuario
 */
utils.mapUserPublic = (u) => {
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
utils.executeModel = (sequelize, owner, fn, params) => {
  var def = Q.defer();

  sequelize.transaction(t => {
    return owner[fn]
      .apply(owner, params)
      .then(o => {
        def.resolve(o);
      })
      .catch(err => {
        def.reject(err);
      });
  });

  return def.promise;
}

/**
 * Ejecuta una función de la base de datos.
 * 
 * @param  {String} fn       Nombre de la función
 * @param  {Object}   params Parametros
 * @return {Promise} 
 */
utils.executeFn = (sequelize, fn, params) => {
  var def = Q.defer();

  var replacements = Object.keys(params).map(p => {
    return `:${p}`;
  });
  var rstr = replacements.join(',');

  sequelize
    .query(`SELECT public.${fn}(${rstr}) as resul`,
      { 
        replacements: params,
        type: sequelize.QueryTypes.SELECT
      }
    )
    .then(function(res) {
      var result = null;
      if (res.length > 0){
        result = res[0].result;
      }
      def.resolve(result);
    })
    .catch(function(err){
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
utils.executeSelect = (sequelize, query, replacements) => {
  var def = Q.defer();

  sequelize
    .query(query,
      { 
        replacements: replacements,
        type: sequelize.QueryTypes.SELECT
      }
    )
    .then(res => {
      def.resolve(res);
    })
    .catch(function(err){
      def.reject(err);
    });

  return def.promise;
}

module.exports = utils;