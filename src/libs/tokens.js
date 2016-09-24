'use strict';

import Q from 'q';
import utils from '../utils';
import moment from 'moment';
import Auto_tokens from './tokens.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
export default class Tokens extends Auto_tokens{
  constructor(owner){
    super(owner);
  }
  
  create(obj){
    var def = Q.defer();

    let user_id_users = obj.user_id_users;
    let code = this.security.randomCode();
    let days = days === undefined ? 1 : obj.days;
    let token_salt = this.security.radomSalt();

    let creation = new Date();
    let expiration = moment(creation).add(days, 'days');
    let type = obj.type || 'activation';

    let token = this.security.encrypt(code);

    let dbObj = {
      token: token,
      user_id_users: user_id_users,
      type: type,
      expiration: expiration,
      token_salt: token_salt
    };

    super
      .create(dbObj)
      .then(t => {
        def.resolve({ token: t, code: code});
      })
      .catch(err => {
        def.reject(err);
      });

    return def.promise;
  }
  
  passwordToken(obj){
    obj.type = 'password_change';
    return this.create(obj);
  }

  activationToken(obj){
    obj.type = 'activation';
    return this.create(obj);
  }

  getByHash(hash){
    var params = { token: hash };
    return this.findOne(params);
  }
}