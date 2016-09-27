'use strict';
// import Auto_groupsMemberships from './groupsMemberships.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_groupsMemberships {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.groupsMemberships, 'create', [obj]);
  }
  update(obj) {
    let group_id_groups = obj.group_id_groups;
    delete obj.group_id_groups;
    let user_id_users = obj.user_id_users;
    delete obj.user_id_users;
    let where = {
      where: {
        group_id_groups: group_id_groups,
        user_id_users: user_id_users,
      }
    };
    return utils.executeModel(this.sequelize, this.models.groupsMemberships, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      group_id_groups: obj.group_id_groups,
      user_id_users: obj.user_id_users,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupsMemberships, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.groupsMemberships, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupsMemberships, 'findOne', [where]);
  }
  getById(group_id_groups, user_id_users) {
    let params = {
      group_id_groups: group_id_groups,
      user_id_users: user_id_users,
    };
    return this.findOne(params);
  }
}