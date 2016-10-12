'use strict';
// import Auto_modules from './modules.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_modules {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.modules, 'create', [obj]);
  }
  update(obj) {
    let app_apps = obj.app_apps;
    delete obj.app_apps;
    let module = obj.module;
    delete obj.module;
    let where = {
      where: {
        app_apps: app_apps,
        module: module,
      }
    };
    return utils.executeModel(this.sequelize, this.models.modules, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      app_apps: obj.app_apps,
      module: obj.module,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.modules, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.modules, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.modules, 'findOne', [where]);
  }
  getById(app_apps, module) {
    let params = {
      app_apps: app_apps,
      module: module,
    };
    return this.findOne(params);
  }
}