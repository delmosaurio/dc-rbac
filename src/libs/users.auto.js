'use strict';
// import Auto_users from './users.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_users {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.users, 'create', [obj]);
  }
  update(obj) {
    let user_id = obj.user_id;
    delete obj.user_id;
    let where = {
      where: {
        user_id: user_id,
      }
    };
    return utils.executeModel(this.sequelize, this.models.users, 'update', [obj, where]);
  }
  delete(obj) {
    throw new Error('Not implemented');
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.users, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.users, 'findOne', [where]);
  }
  getById(user_id) {
    let params = {
      user_id: user_id,
    };
    return this.findOne(params);
  }
}