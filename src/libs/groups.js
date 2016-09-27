'use strict';

import Q from 'q';
import utils from '../utils';
import async from 'async';

import Auto_groups from './groups.auto.js';
import Auto_groupHasGroups from './groupHasGroups.auto.js';
import Auto_groupsMemberships from './groupsMemberships.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla groups.
 */
export default class Groups extends Auto_groups {
  constructor(owner){
    super(owner);

    this.groupsHas = new Auto_groupHasGroups(owner);
    this.memberships = new Auto_groupsMemberships(owner);
  }

  _getGroupsFor(groupId, results, cb){
    if (typeof results === 'function'){
      cb = results;
      results = [];  
    }

    var params;

    if (groupId instanceof Array){
      params = { group_id_groups: { $in: groupId } };
    } else {
      params = { group_id_groups: groupId };
    }

    this
      .groupsHas
      .findAll(params)
      .then(childs => {

        if (childs.length === 0){
          return cb(null, results);
        }

        async.concat(
          childs,
          (item, icb) => {
            this
              ._getGroupsFor(item.has_group_id, results, icb);
        }, (perr, cc) => {
          if (perr){
            return cb(perr);  
          }
          //results = results.concat(cc);
          results = results.concat(childs, cc);
          cb(null, results);
        });

      })
      .catch( err => {
        cb(err)
      });
  }

  getGroupsFor(groupId){
    var def = Q.defer();

    this._getGroupsFor(
      groupId,
      (err, theResults) => {
        if (err){
          return def.reject(err);
        }
        def.resolve(theResults);
      }
    );
    
    return def.promise;
  }

  getMemberships(groupId){
    var def = Q.defer();

    var params = { group_id_groups: groupId };
    return this
            .memberships
            .findAll(params);

    return def.promise;
  }
}