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
    let app_id = obj.app_id;
    delete obj.app_id;
    let where = {
      where: {
        app_id: app_id,
      }
    };
    return utils.executeModel(this.sequelize, this.models.apps, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      app_id: obj.app_id,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.apps, 'destroy', [where]);
  }
  findAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.apps, 'findAll', [where]);
  }
  findAndCountAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.apps, 'findAndCountAll', [where]);
  }
  findOne(params, notWhere) {
    let where = {
      where: params
    };
    if (notWhere) {
      where = params
    }
    return utils.executeModel(this.sequelize, this.models.apps, 'findOne', [where]);
  }
  getById(app_id) {
    let params = {
      app_id: app_id,
    };
    return this.findOne(params);
  }
}