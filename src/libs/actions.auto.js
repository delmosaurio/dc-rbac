'use strict';
// import Auto_actions from './actions.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_actions {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.actions, 'create', [obj]);
  }
  update(obj) {
    let action_id = obj.action_id;
    delete obj.action_id;
    let module_id_modules = obj.module_id_modules;
    delete obj.module_id_modules;
    let where = {
      where: {
        action_id: action_id,
        module_id_modules: module_id_modules,
      }
    };
    return utils.executeModel(this.sequelize, this.models.actions, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      action_id: obj.action_id,
      module_id_modules: obj.module_id_modules,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.actions, 'destroy', [where]);
  }
  findAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.actions, 'findAll', [where]);
  }
  findAndCountAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.actions, 'findAndCountAll', [where]);
  }
  findOne(params, notWhere) {
    let where = {
      where: params
    };
    if (notWhere) {
      where = params
    }
    return utils.executeModel(this.sequelize, this.models.actions, 'findOne', [where]);
  }
  getById(action_id, module_id_modules) {
    let params = {
      action_id: action_id,
      module_id_modules: module_id_modules,
    };
    return this.findOne(params);
  }
}