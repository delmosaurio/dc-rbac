'use strict';

import groupHasGroups from  './group_has_groups';
import tokens from  './tokens';
import groupsMemberships from  './groups_memberships';
import modules from  './modules';
import apps from  './apps';
import groupsPrivileges from  './groups_privileges';
import actions from  './actions';
import objectTypes from  './object_types';
import usersPrivileges from  './users_privileges';
import groups from  './groups';
import objects from  './objects';
import userScopes from  './user_scopes';
import groupScopes from  './group_scopes';
import users from  './users';



export default class Models {
  constructor(sequelize, DataTypes){
    this.groupHasGroups = groupHasGroups(sequelize, DataTypes);
    this.tokens = tokens(sequelize, DataTypes);
    this.groupsMemberships = groupsMemberships(sequelize, DataTypes);
    this.modules = modules(sequelize, DataTypes);
    this.apps = apps(sequelize, DataTypes);
    this.groupsPrivileges = groupsPrivileges(sequelize, DataTypes);
    this.actions = actions(sequelize, DataTypes);
    this.objectTypes = objectTypes(sequelize, DataTypes);
    this.usersPrivileges = usersPrivileges(sequelize, DataTypes);
    this.groups = groups(sequelize, DataTypes);
    this.objects = objects(sequelize, DataTypes);
    this.userScopes = userScopes(sequelize, DataTypes);
    this.groupScopes = groupScopes(sequelize, DataTypes);
    this.users = users(sequelize, DataTypes);
  
  }
}