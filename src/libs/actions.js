'use strict';

import Q from 'q';
import utils from '../utils';
import async from 'async';
import _ from 'lodash';

import Auto_actions from './actions.auto.js';
import Apps from './apps.js';
import Modules from './modules.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
export default class Actions extends Auto_actions{
  constructor(owner){
    super(owner);

    this.apps = new Apps(owner);
    this.modules = new Modules(owner);
  }

  populate(actions){
    var def = Q.defer();

    async.waterfall([
      (cb) => {
        var ids = _.map(actions, a => {
          return a.action_id_actions;
        });

        var where = {
          action_id: {
            '$in': ids
          }
        };

        this
          .findAll(where)
          .then( all => {
            all = _.map(all, a => {
              var aa = _.find(actions, {action_id_actions: a.action_id });
              a.action_grant = aa.action_grant;
              a.action_deny = aa.action_deny;
              a.group_id_groups = aa.group_id_groups;
              a.inherits = aa.inherits;
              return a;
            });
            cb(null, all);
          })
          .catch(cb)
      },
      (actions, cb) => {
        var ids = _.map(actions, a => {
          return a.module_id_modules;
        });
        var where = {
          module_id: {
            '$in': ids
          }
        };
        this.modules
          .findAll(where)
          .then( modules => {
            cb(null, actions, modules);
          })
          .catch(cb);
      },
      (actions, modules, cb) => {
        var ids = _.map(modules, m => {
          return m.app_id_apps;
        });
        var where = {
          app_id: {
            '$in': ids
          }
        };
        this.apps
          .findAll(where)
          .then( apps => {

            var mresults = _.map(modules, mm => {
              var app = _.find(apps, { app_id: mm.app_id_apps });
              mm.app = app;
              return mm;
            });
            var results = _.map(actions, a => {
              var m = _.find(mresults, { module_id: a.module_id_modules });
              a.module = m;
              return a;
            });

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

  resolveAction(_app, _module, _action){
    var def = Q.defer();

    async.waterfall([
      (cb) => {
        this.apps
          .findOne({ app: _app })
          .then(function(app) {
            cb(null, app);
          })
          .catch(cb);
      },
      (app, cb) => {
        this.modules
          .findOne({ module: _module, app_id_apps: app.app_id })
          .then(function(module) {
            module.app = app;
            cb(null, module);
          })
          .catch(cb);
      },
      (module, cb) => {
        this
          .findOne({ action: _action, module_id_modules: module.module_id })
          .then(function(action) {
            action.module = module; 
            cb(null, action);
          })
          .catch(cb);
      }
    ], (err, result) => {
      if (err){
        return def.reject(err);
      }
      def.resolve(result);
    });

    return def.promise;
  }
}