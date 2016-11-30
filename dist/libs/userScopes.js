'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _userScopesAuto = require('./userScopes.auto.js');

var _userScopesAuto2 = _interopRequireDefault(_userScopesAuto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla.
 */
var UserScopes = function (_Auto_userScopes) {
  _inherits(UserScopes, _Auto_userScopes);

  function UserScopes(owner) {
    _classCallCheck(this, UserScopes);

    return _possibleConstructorReturn(this, (UserScopes.__proto__ || Object.getPrototypeOf(UserScopes)).call(this, owner));
  }

  return UserScopes;
}(_userScopesAuto2.default);

exports.default = UserScopes;