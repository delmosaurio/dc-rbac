'use strict';

import objects from './objects';
import profiles from './profiles';
import profilesRoles from './profiles_roles';
import roles from './roles';
import rolesObjects from './roles_objects';
import rolesRoles from './roles_roles';
import users from './users';
import usersObjects from './users_objects';
import usersRoles from './users_roles';
import Users from './users';

export default class Models {

  constructor(sequelize, DataTypes){
    this.objects = objects(sequelize, DataTypes);
    this.profiles = profiles(sequelize, DataTypes);
    this.profilesRoles = profilesRoles(sequelize, DataTypes);
    this.roles = roles(sequelize, DataTypes);
    this.rolesObjects = rolesObjects(sequelize, DataTypes);
    this.rolesRoles = rolesRoles(sequelize, DataTypes);
    this.users = users(sequelize, DataTypes);
    this.usersObjects = usersObjects(sequelize, DataTypes);
    this.usersRoles = usersRoles(sequelize, DataTypes);
  }

}