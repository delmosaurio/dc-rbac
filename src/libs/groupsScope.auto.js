'use strict';
// import Auto_groupsScope from './groupsScope.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_groupsScope {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.groupsScope, 'create', [obj]);
  }
  update(obj) {
    let group_id_groups = obj.group_id_groups;
    delete obj.group_id_groups;
    let target_table = obj.target_table;
    delete obj.target_table;
    let where = {
      where: {
        group_id_groups: group_id_groups,
        target_table: target_table,
      }
    };
    return utils.executeModel(this.sequelize, this.models.groupsScope, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      group_id_groups: obj.group_id_groups,
      target_table: obj.target_table,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupsScope, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.groupsScope, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupsScope, 'findOne', [where]);
  }
  getById(group_id_groups, target_table) {
    let params = {
      group_id_groups: group_id_groups,
      target_table: target_table,
    };
    return this.findOne(params);
  }
}