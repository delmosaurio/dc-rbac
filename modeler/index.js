'use strict';

var path = require('path');

var Sequelize = require('sequelize');
var DataTypes = Sequelize;
var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var ejs = require('ejs');
var beautify = require('js-beautify').js_beautify;
var mkdirp = require('mkdirp');
var generator = require('./generator');

var tables = {};

var sequelize = {
  define: function(name, attributes){
    tables[name] = attributes;
  }
};

//var users = require('./models/users.js')(sequelize, Sequelize);

var SequelizeAuto = require('sequelize-auto');

mkdirp.sync('./.tmp/models/');

var auto = new SequelizeAuto('rbac', 'postgres', '', {
  dialect: "postgres", // or 'sqlite', mysql', 'mariadb'
  port:    5432, // or 5432 (for postgres)
  //schema: 'rbac',
  directory: path.resolve('./.tmp/models/'),
  //schemaDelimiter: '.',
  logging: null
});

auto.run(build);


function build(err){
  if (err){
    throw err;
  }

  var modelTempl = fs.readFileSync('./modeler/model.ejs.js', 'utf-8');
  var modelTemplate = ejs.compile(modelTempl, {});

  var entityTempl = fs.readFileSync('./modeler/entity.ejs.js', 'utf-8');
  var entityTemplate = ejs.compile(entityTempl, {});

  var templateIndex = ejs.compile(fs.readFileSync('./modeler/index.ejs.js', 'utf-8'), {});

  var includes = ['apps', 'users', 'tokens', 'groups', 'group_has_groups', 'groups_memberships'];

  async
    .eachSeries(
      _.keys(auto.tables),
      function(tname, cb){

        async.parallel([
          function(icb){
            var params = generator.buildParams(auto, tname);
            var out = modelTemplate({name: tname, fields: auto.tables[tname], params: params });

            var fname = path.join(process.cwd(), '/src/models/', tname+'.js');
            fname = path.resolve(fname);
            fs.writeFile(fname, beautify(out, { indent_size: 2, preserve_newlines: false }), icb);
          },
          function(icb){
            if (includes.indexOf(tname) === -1){
              return icb(null);
            }
            var params = generator.buildParams(auto, tname);
            if (tname === 'actions'){
              console.log(auto.tables[tname]);
            }
            var pkeys = _.filter(_.keys(auto.tables[tname]), function(pk){
              var thing = auto.tables[tname][pk];
              var fk = true;
              if (thing.foreignKey){
                fk = thing.foreignKey.contype !== 'u';
              }
              return thing.primaryKey && fk;
            });
            pkeys = _.sortBy(pkeys);
            var out = entityTemplate({name: tname, fields: auto.tables[tname], pkeys: pkeys, params: params, _: _ });

            var fname = path.join(process.cwd(), '/src/libs/', _.camelCase(tname)+'.auto.js');
            fname = path.resolve(fname);
            fs.writeFile(fname, beautify(out, { indent_size: 2, preserve_newlines: false }), icb);
          }
        ], function(err){
          cb(err);
        });

      }, function(err){
        if (err){
          throw err;
        }
        //console.log(tables);
        var ifname = path.join(process.cwd(), '/src/models/index.js');
        var idxOut = templateIndex({tables: auto.tables, _: _})
        fs.writeFile(ifname, idxOut, function(){
          console.log('Done!');
        });
        
      });
}