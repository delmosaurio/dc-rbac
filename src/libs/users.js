'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_users from './users.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla users.
 */
export default class Users extends Auto_users{
  constructor(owner){
    super(owner.sequelize, owner.models);
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
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
}