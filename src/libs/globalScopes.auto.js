'use strict';
// import Auto_globalScopes from './globalScopes.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_globalScopes {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.globalScopes, 'create', [obj]);
  }
  update(obj) {
    let group_id_groups = obj.group_id_groups;
    delete obj.group_id_groups;
    let target = obj.target;
    delete obj.target;
    let where = {
      where: {
        group_id_groups: group_id_groups,
        target: target,
      }
    };
    return utils.executeModel(this.sequelize, this.models.globalScopes, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      group_id_groups: obj.group_id_groups,
      target: obj.target,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.globalScopes, 'destroy', [where]);
  }
  findAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.globalScopes, 'findAll', [where]);
  }
  findAndCountAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.globalScopes, 'findAndCountAll', [where]);
  }
  findOne(params, notWhere) {
    let where = {
      where: params
    };
    if (notWhere) {
      where = params
    }
    return utils.executeModel(this.sequelize, this.models.globalScopes, 'findOne', [where]);
  }
  getById(group_id_groups, target) {
    let params = {
      group_id_groups: group_id_groups,
      target: target,
    };
    return this.findOne(params);
  }
}