import Q from 'q';
import Models from './models/';
import Sequelize from 'sequelize';
import moment from 'moment';
import Security from './libs/security';
import utils from './libs/utils';
import path from 'path';
import setup from './libs/setup.js';
import factories from './libs/factories';

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
      var database = db.database;
      var user = db.user;
      var pwd = db.pwd;
      var structure = path.resolve('./model/rbac.sql');
      var functions = path.resolve('./model/rbac_functions.sql');
    this.setup = setup({database, user, pwd, structure, functions});

    // registramos las functions
    factories(this);
  }
}
