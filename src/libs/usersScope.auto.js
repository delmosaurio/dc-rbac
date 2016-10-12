'use strict';
// import Auto_usersScope from './usersScope.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_usersScope {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.usersScope, 'create', [obj]);
  }
  update(obj) {
    let target_table = obj.target_table;
    delete obj.target_table;
    let user_id_users = obj.user_id_users;
    delete obj.user_id_users;
    let where = {
      where: {
        target_table: target_table,
        user_id_users: user_id_users,
      }
    };
    return utils.executeModel(this.sequelize, this.models.usersScope, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      target_table: obj.target_table,
      user_id_users: obj.user_id_users,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.usersScope, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.usersScope, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.usersScope, 'findOne', [where]);
  }
  getById(target_table, user_id_users) {
    let params = {
      target_table: target_table,
      user_id_users: user_id_users,
    };
    return this.findOne(params);
  }
}