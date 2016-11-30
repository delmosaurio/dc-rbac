'use strict';
// import Auto_objects from './objects.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_objects {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.objects, 'create', [obj]);
  }
  update(obj) {
    let object_id = obj.object_id;
    delete obj.object_id;
    let object_type = obj.object_type;
    delete obj.object_type;
    let where = {
      where: {
        object_id: object_id,
        object_type: object_type,
      }
    };
    return utils.executeModel(this.sequelize, this.models.objects, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      object_id: obj.object_id,
      object_type: obj.object_type,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.objects, 'destroy', [where]);
  }
  findAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.objects, 'findAll', [where]);
  }
  findAndCountAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.objects, 'findAndCountAll', [where]);
  }
  findOne(params, notWhere) {
    let where = {
      where: params
    };
    if (notWhere) {
      where = params
    }
    return utils.executeModel(this.sequelize, this.models.objects, 'findOne', [where]);
  }
  getById(object_id, object_type) {
    let params = {
      object_id: object_id,
      object_type: object_type,
    };
    return this.findOne(params);
  }
}