'use strict';

import fs from 'fs';
import async from 'async';
import Sequelize from 'sequelize';
import pg from 'pg';
import Q from 'q';


export default function (ops) {
  return function(callback){
    var def = Q.defer();

    var conStringPri = `postgres://${ops.user}:${ops.pwd}@${ops.host}:${ops.port}/postgres`;
    var conStringPost = `postgres://${ops.user}:${ops.pwd}@${ops.host}:${ops.port}/${ops.database}`;

    async.waterfall([
      function(cb){
        var script = `SELECT 1 FROM pg_database WHERE datname='${ops.database}';`;
        executeScript(conStringPri, script, function(err, result) {
          if (err){
            return cb(err);
          }
          if (result.rowCount > 0){
            return cb(new Error('Database exists.'));
          }
          // if not exists create 
          return cb(null, true);
        });
      },
      function(create, cb){
        if (!create){
          return cb(null, create);
        }
        var script = `CREATE DATABASE ${ops.database};`;

        executeScript(conStringPri, script, function(err, result) {
            if (err){
              return cb(err);
            }
            // if not exists create 
            return cb(null, create);
        });
      },
      function(create, cb){
        if (!create){
          return cb(null, create);
        }

        var script = fs.readFileSync(ops.structure, 'utf-8');
        executeScript(conStringPost, script, function(err, result) {
          return cb(err, create);
        });
      },
      function(create, cb){
        if (!create){
          return cb(null);
        }

        var script = fs.readFileSync(ops.functions, 'utf-8');
        executeScript(conStringPost, script, function(err, result) {
          return cb(err, create);
        });
      }
    ], function(err){
      if (err){
        return def.reject(err);
      }
      def.resolve(true);
    });

    return def.promise;
  } 

  // execut an pg script
  function executeScript(connString, script, cb){
    pg.connect(connString, function(err, client, done) {
        if (err){
          return cb(err);
        }
        client.query(script, function(err, result) {
          try {
            client.end(); // close the connection
          } catch(ex){
            return cb(err)
          }
        
          if (err){
            return cb(err);
          }

          cb(null, result);
        });
    });
  }
}