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
    let action_id_actions = obj.action_id_actions;
    delete obj.action_id_actions;
    let group_id_groups = obj.group_id_groups;
    delete obj.group_id_groups;
    let where = {
      where: {
        action_id_actions: action_id_actions,
        group_id_groups: group_id_groups,
      }
    };
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      action_id_actions: obj.action_id_actions,
      group_id_groups: obj.group_id_groups,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'destroy', [where]);
  }
  findAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'findAll', [where]);
  }
  findAndCountAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'findAndCountAll', [where]);
  }
  findOne(params, notWhere) {
    let where = {
      where: params
    };
    if (notWhere) {
      where = params
    }
    return utils.executeModel(this.sequelize, this.models.groupsPrivileges, 'findOne', [where]);
  }
  getById(action_id_actions, group_id_groups) {
    let params = {
      action_id_actions: action_id_actions,
      group_id_groups: group_id_groups,
    };
    return this.findOne(params);
  }
}