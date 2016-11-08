'use strict';

import Q from 'q';
import utils from '../utils';
import async from 'async';
import _ from 'lodash';

import Auto_groupsPrivileges from './groupsPrivileges.auto.js';
import Groups from './groups.js';
import Actions from './actions.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
export default class GroupsPrivileges extends Auto_groupsPrivileges{
  constructor(owner){
    super(owner);

    this.groups = new Groups(owner);
    this.actions = new Actions(owner);
  }

  actionsFor(groupId){
    var def = Q.defer();
    
    async.waterfall([
      (cb) => {
        this.findAll({ group_id_groups: groupId })
          .then(privs => {
            cb(null, privs);
          })
          .catch(cb);
      },
      (privs, cb) => {
        this.groups
          .getGroupsAll(groupId)
          .then(groups => {
            cb(null, privs, groups);
          })
          .catch(cb);
      },
      (privs, groups, cb) => {
        async.concat(
          groups,
          (g, icb) => {
            this.findAll({ group_id_groups: g.group_id })
            .then(privs => {
              privs = _.map(privs, p => {
                p.inherits = g;
                return p;
              });
              icb(null, privs);
            })
            .catch(icb);
          },
          (err, results) => {
            if (err){
              return cb(err);
            }
            cb(null, privs, results);
          }
        );
      },
      (group, inherits, cb) => {
        let actions = group.concat(inherits);
        cb(null, actions);
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