'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_users from './users.auto.js';

function _map(item){
  if (item instanceof Array){
    return item.map( i => {
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
export default class Users extends Auto_users{
  constructor(owner){
    super(owner);
  }

  // Override methods
  create(obj) {
    var def = Q.defer();
    super
      .create(obj)
      .then(res => {
        def.resolve(_map(res));
      })
      .catch( err => {
        def.reject(err);
      });
    return def.promise;
  }

  findAll(filters) {
    var def = Q.defer();
    super
      .findAll(filters)
      .then(res => {
        def.resolve(_map(res));
      })
      .catch( err => {
        def.reject(err);
      });
    return def.promise;
  }

  findOne(params) {
    var def = Q.defer();
    super
      .findOne(params)
      .then(res => {
        def.resolve(_map(res));
      })
      .catch( err => {
        def.reject(err);
      });
    return def.promise;
  }

  register(user){

    user.signon_type = user.signon_type || 'local';
    user.user_state = user.user_state || 'verifying';
    var pwdObj = this.security.generatePassword(user.password);
    user.password = pwdObj.hash;
    user.user_salt = pwdObj.salt;

    return this.create(user);
  }

  getByUsernameOrEmail(username){
    var params = { $or:  [{username: username}, {email: username}] };
    return this.findOne(params);
  }

  getByGoogleId(googlId){
    var params = {google_id: googlId};
    return this.findOne(params);
  }

  changePassword(userId, newPassword){
    var pwdObj = this.security.generatePassword(newPassword);

    let salt = pwdObj.salt;
    let pwd = pwdObj.hash;

    let user = { 
      user_id: userId,
      password: pwd, 
      user_salt: salt
    };

    return this.update(user);
  }

  enable(userId){
    let user = { 
      user_id: userId,
      user_state: 'enabled'
    };

    return this.update(user);
  }

  disable(userId){
    let user = { 
      user_id: userId,
      user_state: 'disabled'
    };

    return this.update(user);
  }

  authenticate(username, pwd){
    var def = Q.defer();

    var params = { $or:  [{username: username}, {email: username}] };

    super
      .findOne(params)
      .then(user => {
        if (!user){
          return def.reject(new Error('Unknown user'));
        }

        if (user.user_state !== 'enabled'){
          return def.reject(new Error('The user is not enabled'));
        }

        var savedpwd = user.password;
        var salt = user.user_salt;

        try{
          var cp = this.security.comparePassword(pwd, savedpwd);

          if (cp){
            return def.resolve(_map(user));
          }
          return def.reject(new Error('Wrong password'));
        } catch(err){
          return def.reject(err);
        }
      })
      .catch(err => {
        def.reject(err);
      });

    return def.promise;
  }
}