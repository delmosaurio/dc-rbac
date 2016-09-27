'use strict';

import groupHasGroups from  './group_has_groups';
import modules from  './modules';
import tokens from  './tokens';
import apps from  './apps';
import usersPrivileges from  './users_privileges';
import actions from  './actions';
import groupsMemberships from  './groups_memberships';
import groupsPrivileges from  './groups_privileges';
import groups from  './groups';
import groupsScope from  './groups_scope';
import usersScope from  './users_scope';
import users from  './users';



export default class Models {
  constructor(sequelize, DataTypes){
    this.groupHasGroups = groupHasGroups(sequelize, DataTypes);
    this.modules = modules(sequelize, DataTypes);
    this.tokens = tokens(sequelize, DataTypes);
    this.apps = apps(sequelize, DataTypes);
    this.usersPrivileges = usersPrivileges(sequelize, DataTypes);
    this.actions = actions(sequelize, DataTypes);
    this.groupsMemberships = groupsMemberships(sequelize, DataTypes);
    this.groupsPrivileges = groupsPrivileges(sequelize, DataTypes);
    this.groups = groups(sequelize, DataTypes);
    this.groupsScope = groupsScope(sequelize, DataTypes);
    this.usersScope = usersScope(sequelize, DataTypes);
    this.users = users(sequelize, DataTypes);
  
  }
}