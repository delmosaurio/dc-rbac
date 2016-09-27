'use strict';
// import Auto_apps from './apps.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_apps {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.apps, 'create', [obj]);
  }
  update(obj) {
    let app = obj.app;
    delete obj.app;
    let where = {
      where: {
        app: app,
      }
    };
    return utils.executeModel(this.sequelize, this.models.apps, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      app: obj.app,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.apps, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.apps, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.apps, 'findOne', [where]);
  }
  getById(app) {
    let params = {
      app: app,
    };
    return this.findOne(params);
  }
}