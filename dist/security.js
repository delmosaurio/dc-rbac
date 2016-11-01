'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _bs = require('bs58');

var _bs2 = _interopRequireDefault(_bs);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Clase con utilidades de Criptografia
 *
 * Algoritmo utilizado [blowfish]
 */
var Security = function () {
  /**
   * Crea una nueva instancia de Cipher con opciones:
   *   salt -- private salt
   *    
   * @param  {Object} ops Opciones
   * @return {[type]}     [description]
   */
  function Security(ops) {
    _classCallCheck(this, Security);

    ops = ops || {};
    if (!ops.secret) {
      throw new Error('Unknown secret');
    }
    this.key = ops.secret;
  }

  /**
   * Encripta `text`
   * @param  {String} text Texto a encriptar
   * @return {String} text encriptado 
   */


  _createClass(Security, [{
    key: 'encrypt',
    value: function encrypt(text) {
      return this.privateEncrypt(text, this.key);
    }

    /**
     * Encripta `text` utilizando una `key` privada
     * @param  {String} text Texto a encriptar
     * @param  {String} key  Key privada
     * @return {String}      text encriptado con key
     */

  }, {
    key: 'privateEncrypt',
    value: function privateEncrypt(text, key) {
      return (0, _md2.default)(key + text);
    }

    /**
     * Devuelve un salt aleatorio
     * 
     * @return {String}
     */

  }, {
    key: 'radomSalt',
    value: function radomSalt() {
      var theThing = new Date().valueOf().toString();
      theThing += Math.random().toString();
      return this.encrypt(theThing);
    }

    /**
     * Genera un nuevo password y salt
     * @param  {[type]} plainTextPassword [description]
     * @return {[type]}                   [description]
     */

  }, {
    key: 'generatePassword',
    value: function generatePassword(plainTextPassword) {
      var salt = _bcrypt2.default.genSaltSync(this.saltRounds);
      var hash = _bcrypt2.default.hashSync(plainTextPassword, salt);

      return {
        salt: salt,
        hash: hash
      };
    }

    /**
     * Compara contraseñas passwords
     * 
     * @param  {String} plainTextPassword 
     * @param  {String} hash hashed              
     * @return {String}                   
     */

  }, {
    key: 'comparePassword',
    value: function comparePassword(plainTextPassword, hash) {
      return _bcrypt2.default.compareSync(plainTextPassword, hash);
    }

    /**
     * Compone un token aleatoreo
     * 
     * @param  {Integer} randomBytes Cantidad de bytes
     * @return {String}              Token
     */

  }, {
    key: 'randomToken',
    value: function randomToken(randomBytes) {
      randomBytes = randomBytes || 16;
      var buf = _crypto2.default.randomBytes(randomBytes);

      return _bs2.default.encode(buf);
    }

    /**
     * Compone un token de 6 bytes
     * 
     * @return {String}   Token
     */

  }, {
    key: 'randomCode',
    value: function randomCode() {
      return this.randomToken(6);
    }
  }]);

  return Security;
}();

exports.default = Security;