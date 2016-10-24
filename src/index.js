import Q from 'q';
import Models from './models/';
import Sequelize from 'sequelize';
import moment from 'moment';
import Security from './security';
import utils from './utils';
import path from 'path';
import setup from './setup';
import Apps from './libs/apps';
import Users from './libs/users';
import Tokens from './libs/tokens';
import Groups from './libs/groups';

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
    db.host = db.host || 'localhost'
    db.user = db.user || 'postgres';
    db.port = db.port || 5432;
    db.pwd = db.pwd || '';
    let logging = ops.logging || false;

    this.secret = ops.secret || '0198273498327465';

    this.security = new Security({ secret: this.secret});
    
    this.sequelize = new Sequelize(db.database, db.user, db.pwd, {
      host: db.host,
      dialect: "postgres",
      port:    db.port,
      timestamps: false,
      logging: logging
    });

    this.models = new Models(this.sequelize, Sequelize);
    
    let database = db.database;
    let user = db.user;
    let pwd = db.pwd;
    let host = db.host;
    let port = db.port;
    let structure = path.resolve(path.join(__dirname, '../model/rbac.sql'));
    let functions = path.resolve(path.join(__dirname, '../model/rbac_functions.sql'));
    this.setup = setup({database, user, pwd, host, port, structure, functions});
  }

  get apps() {
    if (!this._apps){
      this._apps = new Apps(this);
    }
    return this._apps;
  }

  get users() {
    if (!this._users){
      this._users = new Users(this);
    }
    return this._users;
  }

  get tokens() {
    if (!this._tokens){
      this._tokens = new Tokens(this);
    }
    return this._tokens;
  }

  get groups() {
    if (!this._groups){
      this._groups = new Groups(this);
    }
    return this._groups;
  }
  
}
