'use strict';
// import Auto_tokens from './tokens.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_tokens {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.tokens, 'create', [obj]);
  }
  update(obj) {
    let token = obj.token;
    delete obj.token;
    let user_id_users = obj.user_id_users;
    delete obj.user_id_users;
    let where = {
      where: {
        token: token,
        user_id_users: user_id_users,
      }
    };
    return utils.executeModel(this.sequelize, this.models.tokens, 'update', [obj, where]);
  }
  delete(obj) {
    throw new Error('Not implemented');
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.tokens, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.tokens, 'findOne', [where]);
  }
  getById(token, user_id_users) {
    let params = {
      token: token,
      user_id_users: user_id_users,
    };
    return this.findOne(params);
  }
}