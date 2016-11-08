'use strict';

import Q from 'q';
import utils from '../utils';
import async from 'async';
import _ from 'lodash';

import Auto_usersPrivileges from './usersPrivileges.auto.js';
import Actions from './actions.js';

export default class UsersPrivileges extends Auto_usersPrivileges{
  constructor(owner){
    super(owner);

    this.actions = new Actions(owner);
  }

  actionsFor(userId){
    var def = Q.defer();
    
    async.waterfall([
      (cb) => {
        this.findAll({ user_id_users: userId })
          .then(privs => {
            cb(null, privs);
          })
          .catch(cb);
      },
      (actions, cb) => {
        this.actions
            .populate(actions)
            .then(results => {
              cb(null, results);
            })
            .catch(cb);
      }
    ], (err, results) => {
      if (err){
        return def.reject(err);
      }
      def.resolve(results);
    });
    
    return def.promise;
  }
}