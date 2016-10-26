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
    let action_id_actions = obj.action_id_actions;
    delete obj.action_id_actions;
    let user_id_users = obj.user_id_users;
    delete obj.user_id_users;
    let where = {
      where: {
        action_id_actions: action_id_actions,
        user_id_users: user_id_users,
      }
    };
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      action_id_actions: obj.action_id_actions,
      user_id_users: obj.user_id_users,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'destroy', [where]);
  }
  findAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'findAll', [where]);
  }
  findAndCountAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'findAndCountAll', [where]);
  }
  findOne(params, notWhere) {
    let where = {
      where: params
    };
    if (notWhere) {
      where = params
    }
    return utils.executeModel(this.sequelize, this.models.usersPrivileges, 'findOne', [where]);
  }
  getById(action_id_actions, user_id_users) {
    let params = {
      action_id_actions: action_id_actions,
      user_id_users: user_id_users,
    };
    return this.findOne(params);
  }
}