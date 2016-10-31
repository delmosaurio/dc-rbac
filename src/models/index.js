'use strict';

import tokens from  './tokens';
import groupsMemberships from  './groups_memberships';
import groupHasGroups from  './group_has_groups';
import apps from  './apps';
import modules from  './modules';
import actions from  './actions';
import groupsPrivileges from  './groups_privileges';
import usersPrivileges from  './users_privileges';
import scopes from  './scopes';
import groups from  './groups';
import globalScopes from  './global_scopes';
import users from  './users';



export default class Models {
  constructor(sequelize, DataTypes){
    this.tokens = tokens(sequelize, DataTypes);
    this.groupsMemberships = groupsMemberships(sequelize, DataTypes);
    this.groupHasGroups = groupHasGroups(sequelize, DataTypes);
    this.apps = apps(sequelize, DataTypes);
    this.modules = modules(sequelize, DataTypes);
    this.actions = actions(sequelize, DataTypes);
    this.groupsPrivileges = groupsPrivileges(sequelize, DataTypes);
    this.usersPrivileges = usersPrivileges(sequelize, DataTypes);
    this.scopes = scopes(sequelize, DataTypes);
    this.groups = groups(sequelize, DataTypes);
    this.globalScopes = globalScopes(sequelize, DataTypes);
    this.users = users(sequelize, DataTypes);
  
  }
}