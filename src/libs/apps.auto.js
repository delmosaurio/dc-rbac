'use strict';
// import Auto_apps from './apps.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_apps {
  constructor(sequelize, models) {
    this.sequelize = sequelize;
    this.models = models;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.apps, 'create', [obj]);
  }
  update(obj) {
    let app = obj.app;
    delete obj.app;
    let where = {
      where: {
        app: obj.app,
      }
    };
    return utils.executeModel(this.sequelize, this.models.apps, 'update', [obj, where]);
  }
  delete(obj) {
    throw new Error('Not implemented');
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