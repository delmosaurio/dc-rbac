'use strict';
// import Auto_usersPrivileges from './usersPrivileges.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_usersPrivileges {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'create', [obj]);
  }
  update(obj) {
    let user_id_users = obj.user_id_users;
    delete obj.user_id_users;
    let where = {
      where: {
        user_id_users: user_id_users,
      }
    };
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      user_id_users: obj.user_id_users,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'findOne', [where]);
  }
  getById(user_id_users) {
    let params = {
      user_id_users: user_id_users,
    };
    return this.findOne(params);
  }
}