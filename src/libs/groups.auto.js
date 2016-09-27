'use strict';
// import Auto_groups from './groups.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_groups {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.groups, 'create', [obj]);
  }
  update(obj) {
    let group_id = obj.group_id;
    delete obj.group_id;
    let where = {
      where: {
        group_id: group_id,
      }
    };
    return utils.executeModel(this.sequelize, this.models.groups, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      group_id: obj.group_id,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groups, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.groups, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groups, 'findOne', [where]);
  }
  getById(group_id) {
    let params = {
      group_id: group_id,
    };
    return this.findOne(params);
  }
}