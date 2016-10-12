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
    let action = obj.action;
    delete obj.action;
    let app_apps = obj.app_apps;
    delete obj.app_apps;
    let module_modules = obj.module_modules;
    delete obj.module_modules;
    let where = {
      where: {
        action: action,
        app_apps: app_apps,
        module_modules: module_modules,
      }
    };
    return utils.executeModel(this.sequelize, this.models.actions, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      action: obj.action,
      app_apps: obj.app_apps,
      module_modules: obj.module_modules,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.actions, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.actions, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.actions, 'findOne', [where]);
  }
  getById(action, app_apps, module_modules) {
    let params = {
      action: action,
      app_apps: app_apps,
      module_modules: module_modules,
    };
    return this.findOne(params);
  }
}