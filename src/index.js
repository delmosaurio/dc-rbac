import Security from './libs/security';
import Q from 'q';
import Models from './models/';
import Sequelize from 'sequelize';
import moment from 'moment';

/**
 * La clase DcRbac encapsula los metodos necesario
 * para poder trabajar con el modelo RBAC definido
 * en la base de datos.
 *  
 */
export default class DcRbac {
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
  constructor(ops){
    ops = ops || {};
    let db = ops.dbConfig || {};
    db.database = db.database || 'rbac';
    db.user = db.user || 'postgres';
    db.port = db.port || 5432;
    db.pwd = db.pwd || '';
    let logging = ops.logging || false;

    this.secret = ops.secret || '0198273498327465';

    this.security = new Security({ secret: this.secret});
    
    this.sequelize = new Sequelize(db.database, db.user, db.pwd, {
      dialect: "postgres",
      port:    db.port,
      timestamps: false,
      logging: logging
    });

    this.models = new Models(this.sequelize, Sequelize);
  }


  //
  // PRIVATE
  // 
  
  /**
   * Mapea propiedades visibles de un usuario.
   * 
   * @param  {Object} u Usuario
   * @return {Object}   Usuario
   * @private
   */
  mapUserPublic(u){
    delete u.password;
    delete u.user_salt;
    u.profile = { profile_id: u.profile_id_profiles };
    return u;
  }

  /**
   * Ejecuta una función de la base de datos.
   * 
   * @param  {String} fn       Nombre de la función
   * @param  {Object}   params Parametros
   * @promise {Object} Q.promise
   * @private
   */
  executeFn(fn, params){
    var def = Q.defer();

    var replacements = Object.keys(params).map(p => {
      return `:${p}`;
    });
    var rstr = replacements.join(',');

    this.sequelize
      .query(`SELECT public.${fn}(${rstr}) as resul`,
        { 
          replacements: params,
          type: this.sequelize.QueryTypes.SELECT
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
  }

  /**
   * Ejecuta una query en forma de select en la base de datos.
   * 
   * @param  {String} query Query
   * @param  {Object} params Parametros
   * @promise {Object} Q.promise
   * @private
   */
  executeSelect(query, replacements){
    var def = Q.defer();

    this.sequelize
      .query(query,
        { 
          replacements: replacements,
          type: this.sequelize.QueryTypes.SELECT
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
}
