'use strict';
// import Auto_groupHasGroups from './groupHasGroups.auto.js';
import Q from 'q';
import utils from '../utils';
export default class Auto_groupHasGroups {
  constructor(owner) {
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }
  create(obj) {
    return utils.executeModel(this.sequelize, this.models.groupHasGroups, 'create', [obj]);
  }
  update(obj) {
    let group_id_groups = obj.group_id_groups;
    delete obj.group_id_groups;
    let has_group_id = obj.has_group_id;
    delete obj.has_group_id;
    let where = {
      where: {
        group_id_groups: group_id_groups,
        has_group_id: has_group_id,
      }
    };
    return utils.executeModel(this.sequelize, this.models.groupHasGroups, 'update', [obj, where]);
  }
  delete(obj) {
    let params = {
      group_id_groups: obj.group_id_groups,
      has_group_id: obj.has_group_id,
    };
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupHasGroups, 'destroy', [where]);
  }
  findAll(filters) {
    filters = filters || {};
    let where = {
      where: filters
    };
    return utils.executeModel(this.sequelize, this.models.groupHasGroups, 'findAll', [where]);
  }
  findOne(params) {
    let where = {
      where: params
    };
    return utils.executeModel(this.sequelize, this.models.groupHasGroups, 'findOne', [where]);
  }
  getById(group_id_groups, has_group_id) {
    let params = {
      group_id_groups: group_id_groups,
      has_group_id: has_group_id,
    };
    return this.findOne(params);
  }
}