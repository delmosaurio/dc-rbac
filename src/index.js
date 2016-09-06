import Cipher from './cipher';
import Q from 'q';
import Models from './models/';
import Sequelize from 'sequelize';
/**
 * @param {Type}
 * @return {Type}
 */
export default class DcRbac {
  constructor(ops){
    ops = ops || {};
    let db = ops.dbConfig || {};
    db.database = 'rbac';
    db.user = 'postgres';
    db.port = db.port || 5432;
    db.pwd = db.pwd || '';

    this.salt = ops.salt || '0198273498327465';

    this.cipher = new Cipher({ salt: this.salt});
    
    this.sequelize = new Sequelize(db.database, db.user, db.pwd, {
      dialect: "postgres",
      port:    db.port,
      timestamps: false
    });

    this.models = new Models(this.sequelize, Sequelize);
  }

  createUser(user){
    var def = Q.defer();

    let pid = user.profile_id_profiles;
    let username = user.username;
    let email = user.email;
    let password = user.password;
    let signon_type = user.signon_type || 'local';

    let salt = this.cipher.radomSalt();
    let pwd = this.cipher.composePassword(user.password, salt);

    var dbUser = {
      //user_id
      profile_id_profiles: user.profile_id_profiles,
      username: user.username,
      email: user.email,
      password: pwd,
      signon_type: signon_type,
      salt: salt,
      user_state: 'verifying' // need to activate
    };

    this.sequelize.transaction(t => {
      return this.models.users
        .create(dbUser)
        .then(user => {
          def.resolve(user);
        })
        .catch(err => {
          def.reject(err);
        });
    });

    return def.promise;
  }
}
