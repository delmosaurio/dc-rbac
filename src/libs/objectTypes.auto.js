'use strict';
// import Auto_objectTypes from './objectTypes.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_objectTypes {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.objectTypes, 'create', [obj]);
  }
  update(obj) {
    let object_type_id = obj.object_type_id;
    delete obj.object_type_id;
    let where = {
      where: {
        object_type_id: object_type_id,
      }
    };
    return utils.executeModel(this.sequelize, this.models.objectTypes, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      object_type_id: obj.object_type_id,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.objectTypes, 'destroy', [where]);
  }
  findAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.objectTypes, 'findAll', [where]);
  }
  findAndCountAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.objectTypes, 'findAndCountAll', [where]);
  }
  findOne(params, notWhere) {
    let where = {
      where: params
    };
    if (notWhere) {
      where = params
    }
    return utils.executeModel(this.sequelize, this.models.objectTypes, 'findOne', [where]);
  }
  getById(object_type_id) {
    let params = {
      object_type_id: object_type_id,
    };
    return this.findOne(params);
  }
}