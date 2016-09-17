'use strict';

var _ = require('lodash');

var generator = {};

generator.buildParams = function(auto, table){
  var fields = _.keys(auto.tables[table])
      , spaces = '';

  var _fields = {};

  for (var x = 0; x < auto.options.indentation; ++x) {
    spaces += (auto.options.spaces === true ? ' ' : "\t");
  }

  _.each(fields, function(field, i){
    var foreignKey = (auto.foreignKeys[table] && auto.foreignKeys[table][field])
                     ? auto.foreignKeys[table][field] : null;
    if (_.isObject(foreignKey)) {
      auto.tables[table][field].foreignKey = foreignKey
    }

    // column's attributes
    var fieldAttr = _.keys(auto.tables[table][field]);

    var _field = _fields[field] = {};

    // Serial key for postgres...
    var defaultVal = auto.tables[table][field].defaultValue;

    _.each(fieldAttr, function(attr, x){
      var isSerialKey = auto.tables[table][field].foreignKey && _.isFunction(auto.dialect.isSerialKey) && auto.dialect.isSerialKey(auto.tables[table][field].foreignKey)

      if (attr === "special") {
        return true;
      }

      if (attr === "foreignKey") {
        if (isSerialKey) {
          _field['autoIncrement'] = true;
        }
        else if (foreignKey.isForeignKey) {
          _field['references'] = {
            model: auto.tables[table][field][attr].target_table,
            key: auto.tables[table][field][attr].target_column

          };
        } else return true;
      }
      else if (attr === "primaryKey") {
         if (auto.tables[table][field][attr] === true && (! _.has(auto.tables[table][field], 'foreignKey') || (_.has(auto.tables[table][field], 'foreignKey') && !! auto.tables[table][field].foreignKey.isPrimaryKey)))
          _field['primaryKey'] = true;
        else return true
      }
      else if (attr === "allowNull") {
        _field[attr] = auto.tables[table][field][attr];
      }
      else if (attr === "defaultValue") {
        if ( auto.dialect == 'mssql' &&  defaultVal.toLowerCase() === '(newid())' ) {
          defaultVal = null; // disable adding "default value" attribute for UUID fields if generating for MS SQL
        }  

        var val_text = defaultVal;

        if (isSerialKey) return true

        //mySql Bit fix
        if (auto.tables[table][field].type.toLowerCase() === 'bit(1)') {
          val_text = defaultVal === "b'1'" ? 1 : 0;
        }

        if (_.isString(defaultVal)) {
          if (auto.tables[table][field].type.toLowerCase().indexOf('date') === 0) {
            if (_.endsWith(defaultVal, '()')) {
              val_text = "sequelize.fn('" + defaultVal.replace(/\(\)$/, '') + "')"
            }
            else if (_.includes(['current_timestamp', 'current_date', 'current_time', 'localtime', 'localtimestamp'], defaultVal.toLowerCase())) {
              val_text = "sequelize.literal('" + defaultVal + "')"
            } else {
              val_text = "'" + val_text + "'"
            }
          } else {
            val_text = "'" + val_text + "'"
          }
        }
        if(defaultVal === null) {
          return true;
        } else {
          _field[attr] = val_text;
        }
      }
      else if (attr === "type" && auto.tables[table][field][attr].indexOf('ENUM') === 0) {
        _field[attr] = 'DataTypes.' + auto.tables[table][field][attr]
      } else {
        var _attr = (auto.tables[table][field][attr] || '').toLowerCase();
        var val = "'" + auto.tables[table][field][attr] + "'";
        if (_attr === "tinyint(1)" || _attr === "boolean" || _attr === "bit(1)") {
          val = 'DataTypes.BOOLEAN';
        }
        else if (_attr.match(/^(smallint|mediumint|tinyint|int)/)) {
          var length = _attr.match(/\(\d+\)/);
          val = 'DataTypes.INTEGER' + (!  _.isNull(length) ? length : '');
        }
        else if (_attr.match(/^bigint/)) {
          val = 'DataTypes.BIGINT';
        }
        else if (_attr.match(/^string|varchar|varying|nvarchar/)) {
          val = 'DataTypes.STRING';
        }
        else if (_attr.match(/^char/)) {
          var length = _attr.match(/\(\d+\)/);
          val = 'DataTypes.CHAR' + (!  _.isNull(length) ? length : '');
        }
        else if (_attr.match(/text|ntext$/)) {
          val = 'DataTypes.TEXT';
        }
        else if (_attr.match(/^(date|time)/)) {
          val = 'DataTypes.DATE';
        }
        else if (_attr.match(/^(float|float4)/)) {
          val = 'DataTypes.FLOAT';
        }
        else if (_attr.match(/^decimal/)) {
          val = 'DataTypes.DECIMAL';
        }
        else if (_attr.match(/^(float8|double precision)/)) {
          val = 'DataTypes.DOUBLE';
        }
        else if (_attr.match(/^uuid|uniqueidentifier/)) {
          val = 'DataTypes.UUIDV4';
        }
        else if (_attr.match(/^json/)) {
          val = 'DataTypes.JSON';
        }
        else if (_attr.match(/^jsonb/)) {
          val = 'DataTypes.JSONB';
        }
        else if (_attr.match(/^geometry/)) {
          val = 'DataTypes.GEOMETRY';
        }
        _field[attr] = val;
      }
    });

  });

  return _fields;
};

module.exports = generator;