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

  var templ = fs.readFileSync('./modeler/model.ejs.js', 'utf-8');
  var template = ejs.compile(templ, {});

  var templateIndex = ejs.compile(fs.readFileSync('./modeler/index.ejs.js', 'utf-8'), {});

  async
    .eachSeries(
      _.keys(auto.tables),
      function(tname, cb){
        var rname = path.resolve(path.join('./.tmp/models/', tname+'.js'));

        var params = generator.buildParams(auto, tname);

        var out = template({name: tname, fields: auto.tables[tname], params: params });
        
        var fname = path.join(process.cwd(), '/src/models/', tname+'.js');
        fname = path.resolve(fname);
        fs.writeFile(fname, beautify(out, { indent_size: 2, preserve_newlines: false }), cb);

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