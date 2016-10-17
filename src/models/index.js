'use strict';

import groupsMemberships from  './groups_memberships';
import groupHasGroups from  './group_has_groups';
import apps from  './apps';
import tokens from  './tokens';
import actions from  './actions';
import usersPrivileges from  './users_privileges';
import modules from  './modules';
import groupsPrivileges from  './groups_privileges';
import groups from  './groups';
import scopes from  './scopes';
import users from  './users';



export default class Models {
  constructor(sequelize, DataTypes){
    this.groupsMemberships = groupsMemberships(sequelize, DataTypes);
    this.groupHasGroups = groupHasGroups(sequelize, DataTypes);
    this.apps = apps(sequelize, DataTypes);
    this.tokens = tokens(sequelize, DataTypes);
    this.actions = actions(sequelize, DataTypes);
    this.usersPrivileges = usersPrivileges(sequelize, DataTypes);
    this.modules = modules(sequelize, DataTypes);
    this.groupsPrivileges = groupsPrivileges(sequelize, DataTypes);
    this.groups = groups(sequelize, DataTypes);
    this.scopes = scopes(sequelize, DataTypes);
    this.users = users(sequelize, DataTypes);
  
  }
}