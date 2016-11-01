'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _tokensAuto = require('./tokens.auto.js');

var _tokensAuto2 = _interopRequireDefault(_tokensAuto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
var Tokens = function (_Auto_tokens) {
  _inherits(Tokens, _Auto_tokens);

  function Tokens(owner) {
    _classCallCheck(this, Tokens);

    return _possibleConstructorReturn(this, (Tokens.__proto__ || Object.getPrototypeOf(Tokens)).call(this, owner));
  }

  _createClass(Tokens, [{
    key: 'create',
    value: function create(obj) {
      var def = _q2.default.defer();

      var user_id_users = obj.user_id_users;
      var code = this.security.randomCode();
      var days = days === undefined ? 1 : obj.days;
      var token_salt = this.security.radomSalt();

      var creation = new Date();
      var expiration = (0, _moment2.default)(creation).add(days, 'days');
      var type = obj.type || 'activation';

      var token = this.security.encrypt(code);

      var dbObj = {
        token: token,
        user_id_users: user_id_users,
        type: type,
        expiration: expiration,
        token_salt: token_salt
      };

      _get(Tokens.prototype.__proto__ || Object.getPrototypeOf(Tokens.prototype), 'create', this).call(this, dbObj).then(function (t) {
        def.resolve({ token: t, code: code });
      }).catch(function (err) {
        def.reject(err);
      });

      return def.promise;
    }
  }, {
    key: 'passwordToken',
    value: function passwordToken(obj) {
      obj.type = 'password_change';
      return this.create(obj);
    }
  }, {
    key: 'activationToken',
    value: function activationToken(obj) {
      obj.type = 'activation';
      return this.create(obj);
    }
  }, {
    key: 'getByHash',
    value: function getByHash(hash) {
      var params = { token: hash };
      return this.findOne(params);
    }
  }]);

  return Tokens;
}(_tokensAuto2.default);

exports.default = Tokens;