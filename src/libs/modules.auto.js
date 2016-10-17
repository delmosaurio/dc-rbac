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
    let app_id_apps = obj.app_id_apps;
    delete obj.app_id_apps;
    let module_id = obj.module_id;
    delete obj.module_id;
    let where = {
      where: {
        app_id_apps: app_id_apps,
        module_id: module_id,
      }
    };
    return utils.executeModel(this.sequelize, this.models.modules, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      app_id_apps: obj.app_id_apps,
      module_id: obj.module_id,
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
  getById(app_id_apps, module_id) {
    let params = {
      app_id_apps: app_id_apps,
      module_id: module_id,
    };
    return this.findOne(params);
  }
}