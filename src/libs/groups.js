'use strict';

import Q from 'q';
import utils from '../utils';
import async from 'async';
import _ from 'lodash';

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

  getGroups(groupId){
    var def = Q.defer();

    async.waterfall([
      cb => {
        var params = { group_id_groups: groupId };

        this
          .groupsHas
          .findAll(params)
          .then(res => {
            if (res.length === 0){
              return def.resolve([]);
            }

            var gids = res.map( ge => {
              return ge.has_group_id;
            });

            cb(null, gids);
          })
          .catch(cb);
      },
      (gids, cb) => {
        var params = { group_id: { $in: gids } };

        this
          .findAll(params)
          .then(res => {
            cb(null, res);
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

  getGroupsAll(groupId){
    var def = Q.defer();

    async.waterfall([
      cb => {
        var params = { group_id_groups: groupId };

        this
          .groupsHas
          .findAll(params)
          .then(res => {
            if (res.length === 0){
              return def.resolve([]);
            }

            var gids = res.map( ge => {
              return ge.has_group_id;
            });

            cb(null, gids);
          })
          .catch(cb);
      },
      (gids, cb) => {
        this
          .getGroupsFor(gids)
          .then( res => {
            var ids = res.map( r => {
              return r.has_group_id;
            });
            cb(null, gids, ids);
          })
          .catch(cb);

      },
      (gids, cgids, cb) => {
        var params = { group_id: { $in: cgids } };

        this
          .findAll(params)
          .then(res => {
            res = res.map(r=>{
              r.inherits = true;
              return r;
            });
            cb(null, gids, res);
          })
          .catch(cb);
      },
      (gids, childs, cb) => {
        var params = { group_id: { $in: gids } };

        this
          .findAll(params)
          .then(res => {
            
            // filter repeat groups
            var filtered = _.filter(childs, c => {
              return gids.indexOf(c.group_id) === -1;
            });

            var result = res.concat(filtered);
            cb(null, result);
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