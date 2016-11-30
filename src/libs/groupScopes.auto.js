'use strict';
// import Auto_groupScopes from './groupScopes.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_groupScopes {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.groupScopes, 'create', [obj]);
  }
  update(obj) {
    let group_id_groups = obj.group_id_groups;
    delete obj.group_id_groups;
    let object_id_objects = obj.object_id_objects;
    delete obj.object_id_objects;
    let where = {
      where: {
        group_id_groups: group_id_groups,
        object_id_objects: object_id_objects,
      }
    };
    return utils.executeModel(this.sequelize, this.models.groupScopes, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      group_id_groups: obj.group_id_groups,
      object_id_objects: obj.object_id_objects,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupScopes, 'destroy', [where]);
  }
  findAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.groupScopes, 'findAll', [where]);
  }
  findAndCountAll(filters, notWhere) {
    filters = filters || {};
    let where = {
      where: filters
    };
    if (notWhere) {
      where = filters
    }
    return utils.executeModel(this.sequelize, this.models.groupScopes, 'findAndCountAll', [where]);
  }
  findOne(params, notWhere) {
    let where = {
      where: params
    };
    if (notWhere) {
      where = params
    }
    return utils.executeModel(this.sequelize, this.models.groupScopes, 'findOne', [where]);
  }
  getById(group_id_groups, object_id_objects) {
    let params = {
      group_id_groups: group_id_groups,
      object_id_objects: object_id_objects,
    };
    return this.findOne(params);
  }
}