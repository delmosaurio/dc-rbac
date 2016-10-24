'use strict';

import groupsMemberships from  './groups_memberships';
import tokens from  './tokens';
import apps from  './apps';
import groupHasGroups from  './group_has_groups';
import actions from  './actions';
import groupsPrivileges from  './groups_privileges';
import usersPrivileges from  './users_privileges';
import modules from  './modules';
import scopes from  './scopes';
import groups from  './groups';
import users from  './users';



export default class Models {
  constructor(sequelize, DataTypes){
    this.groupsMemberships = groupsMemberships(sequelize, DataTypes);
    this.tokens = tokens(sequelize, DataTypes);
    this.apps = apps(sequelize, DataTypes);
    this.groupHasGroups = groupHasGroups(sequelize, DataTypes);
    this.actions = actions(sequelize, DataTypes);
    this.groupsPrivileges = groupsPrivileges(sequelize, DataTypes);
    this.usersPrivileges = usersPrivileges(sequelize, DataTypes);
    this.modules = modules(sequelize, DataTypes);
    this.scopes = scopes(sequelize, DataTypes);
    this.groups = groups(sequelize, DataTypes);
    this.users = users(sequelize, DataTypes);
  
  }
}