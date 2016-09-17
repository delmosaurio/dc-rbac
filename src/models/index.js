'use strict';

import usersPrivileges from  './users_privileges';
import usersScope from  './users_scope';
import groups from  './groups';
import actions from  './actions';
import groupHasGroups from  './group_has_groups';
import groupsPrivileges from  './groups_privileges';
import tokens from  './tokens';
import apps from  './apps';
import groupsMemberships from  './groups_memberships';
import modules from  './modules';
import groupsScope from  './groups_scope';
import users from  './users';



export default class Models {
  constructor(sequelize, DataTypes){
    this.usersPrivileges = usersPrivileges(sequelize, DataTypes);
    this.usersScope = usersScope(sequelize, DataTypes);
    this.groups = groups(sequelize, DataTypes);
    this.actions = actions(sequelize, DataTypes);
    this.groupHasGroups = groupHasGroups(sequelize, DataTypes);
    this.groupsPrivileges = groupsPrivileges(sequelize, DataTypes);
    this.tokens = tokens(sequelize, DataTypes);
    this.apps = apps(sequelize, DataTypes);
    this.groupsMemberships = groupsMemberships(sequelize, DataTypes);
    this.modules = modules(sequelize, DataTypes);
    this.groupsScope = groupsScope(sequelize, DataTypes);
    this.users = users(sequelize, DataTypes);
  
  }
}