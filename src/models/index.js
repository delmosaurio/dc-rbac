'use strict';

import groupsMemberships from  './groups_memberships';
import modules from  './modules';
import apps from  './apps';
import groupHasGroups from  './group_has_groups';
import tokens from  './tokens';
import usersPrivileges from  './users_privileges';
import actions from  './actions';
import groupsPrivileges from  './groups_privileges';
import users from  './users';
import groups from  './groups';
import usersScope from  './users_scope';
import groupsScope from  './groups_scope';



export default class Models {
  constructor(sequelize, DataTypes){
    this.groupsMemberships = groupsMemberships(sequelize, DataTypes);
    this.modules = modules(sequelize, DataTypes);
    this.apps = apps(sequelize, DataTypes);
    this.groupHasGroups = groupHasGroups(sequelize, DataTypes);
    this.tokens = tokens(sequelize, DataTypes);
    this.usersPrivileges = usersPrivileges(sequelize, DataTypes);
    this.actions = actions(sequelize, DataTypes);
    this.groupsPrivileges = groupsPrivileges(sequelize, DataTypes);
    this.users = users(sequelize, DataTypes);
    this.groups = groups(sequelize, DataTypes);
    this.usersScope = usersScope(sequelize, DataTypes);
    this.groupsScope = groupsScope(sequelize, DataTypes);
  
  }
}