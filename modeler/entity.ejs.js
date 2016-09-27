'use strict';

// import Auto_<%= _.camelCase(name) %> from './<%= _.camelCase(name) %>.auto.js';

import Q from 'q';
import utils from '../utils';

export default class Auto_<%= _.camelCase(name) %> {
  constructor(owner){
    this.sequelize = owner.sequelize;
    this.models = owner.models;
    this.security = owner.security;
  }

  create(obj) {
    return utils.executeModel(
      this.sequelize,
      this.models.<%=_.camelCase(name) %>,
      'create',
      [obj]
    );
  }

  update(obj) {
    <% pkeys.forEach(function(pk){ -%>
    let <%= pk %> = obj.<%= pk %>;
    delete obj.<%= pk %>;
    <% }); %>

    let where = { 
      where : {
        <% pkeys.forEach(function(pk){ -%>
        <%= pk %>: <%= pk %>,
        <% }); %>
      }
    };

    return utils.executeModel(
      this.sequelize,
      this.models.<%=_.camelCase(name) %>,
      'update',
      [obj, where]
    );
  }

  delete(obj) {
    let params = {
      <% pkeys.forEach(function(pk){ -%>
      <%= pk %>: obj.<%= pk %>,
      <% }); %>
    };

    let where = { 
      where : params
    };

    return utils.executeModel(
      this.sequelize,
      this.models.<%=_.camelCase(name) %>,
      'destroy',
      [where]
    );
  }

  findAll(filters){
    filters = filters || {};
    let where = { where : filters };
    return utils.executeModel(
      this.sequelize,
      this.models.<%=_.camelCase(name) %>,
      'findAll',
      [where]
    );
  }

  findOne(params){
    let where = { 
      where : params
    };
    return utils.executeModel(
      this.sequelize,
      this.models.<%=_.camelCase(name) %>,
      'findOne',
      [where]
    );
  }

  getById(<%= pkeys.join(', ') %>) {
    let params = {
      <% pkeys.forEach(function(pk){ -%>
      <%= pk %>: <%= pk %>,
      <% }); %>
    };
    return this.findOne(params);
  }
}