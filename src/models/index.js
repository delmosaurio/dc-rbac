'use strict';

import groupHasGroups from  './group_has_groups';
import apps from  './apps';
import modules from  './modules';
import tokens from  './tokens';
import groupsMemberships from  './groups_memberships';
import usersPrivileges from  './users_privileges';
import groupsPrivileges from  './groups_privileges';
import groups from  './groups';
import actions from  './actions';
import scopes from  './scopes';
import users from  './users';
import globalScopes from  './global_scopes';



export default class Models {
  constructor(sequelize, DataTypes){
    this.groupHasGroups = groupHasGroups(sequelize, DataTypes);
    this.apps = apps(sequelize, DataTypes);
    this.modules = modules(sequelize, DataTypes);
    this.tokens = tokens(sequelize, DataTypes);
    this.groupsMemberships = groupsMemberships(sequelize, DataTypes);
    this.usersPrivileges = usersPrivileges(sequelize, DataTypes);
    this.groupsPrivileges = groupsPrivileges(sequelize, DataTypes);
    this.groups = groups(sequelize, DataTypes);
    this.actions = actions(sequelize, DataTypes);
    this.scopes = scopes(sequelize, DataTypes);
    this.users = users(sequelize, DataTypes);
    this.globalScopes = globalScopes(sequelize, DataTypes);
  
  }
}