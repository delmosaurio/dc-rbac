'use strict';
// import Auto_groupsPrivileges from './groupsPrivileges.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_groupsPrivileges {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'create', [obj]);
  }
  update(obj) {
    let group_id_groups = obj.group_id_groups;
    delete obj.group_id_groups;
    let module_id_modules = obj.module_id_modules;
    delete obj.module_id_modules;
    let where = {
      where: {
        group_id_groups: group_id_groups,
        module_id_modules: module_id_modules,
      }
    };
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      group_id_groups: obj.group_id_groups,
      module_id_modules: obj.module_id_modules,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'findOne', [where]);
  }
  getById(group_id_groups, module_id_modules) {
    let params = {
      group_id_groups: group_id_groups,
      module_id_modules: module_id_modules,
    };
    return this.findOne(params);
  }
}