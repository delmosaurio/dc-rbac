'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _group_has_groups = require('./group_has_groups');

var _group_has_groups2 = _interopRequireDefault(_group_has_groups);

var _tokens = require('./tokens');

var _tokens2 = _interopRequireDefault(_tokens);

var _groups_memberships = require('./groups_memberships');

var _groups_memberships2 = _interopRequireDefault(_groups_memberships);

var _modules = require('./modules');

var _modules2 = _interopRequireDefault(_modules);

var _apps = require('./apps');

var _apps2 = _interopRequireDefault(_apps);

var _groups_privileges = require('./groups_privileges');

var _groups_privileges2 = _interopRequireDefault(_groups_privileges);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _object_types = require('./object_types');

var _object_types2 = _interopRequireDefault(_object_types);

var _users_privileges = require('./users_privileges');

var _users_privileges2 = _interopRequireDefault(_users_privileges);

var _groups = require('./groups');

var _groups2 = _interopRequireDefault(_groups);

var _objects = require('./objects');

var _objects2 = _interopRequireDefault(_objects);

var _user_scopes = require('./user_scopes');

var _user_scopes2 = _interopRequireDefault(_user_scopes);

var _group_scopes = require('./group_scopes');

var _group_scopes2 = _interopRequireDefault(_group_scopes);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Models = function Models(sequelize, DataTypes) {
  _classCallCheck(this, Models);

  this.groupHasGroups = (0, _group_has_groups2.default)(sequelize, DataTypes);
  this.tokens = (0, _tokens2.default)(sequelize, DataTypes);
  this.groupsMemberships = (0, _groups_memberships2.default)(sequelize, DataTypes);
  this.modules = (0, _modules2.default)(sequelize, DataTypes);
  this.apps = (0, _apps2.default)(sequelize, DataTypes);
  this.groupsPrivileges = (0, _groups_privileges2.default)(sequelize, DataTypes);
  this.actions = (0, _actions2.default)(sequelize, DataTypes);
  this.objectTypes = (0, _object_types2.default)(sequelize, DataTypes);
  this.usersPrivileges = (0, _users_privileges2.default)(sequelize, DataTypes);
  this.groups = (0, _groups2.default)(sequelize, DataTypes);
  this.objects = (0, _objects2.default)(sequelize, DataTypes);
  this.userScopes = (0, _user_scopes2.default)(sequelize, DataTypes);
  this.groupScopes = (0, _group_scopes2.default)(sequelize, DataTypes);
  this.users = (0, _users2.default)(sequelize, DataTypes);
};

exports.default = Models;