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
      this.models.<%=name %>,
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
      this.models.<%=name %>,
      'update',
      [obj, where]
    );
  }

  delete(obj) {
    throw new Error('Not implemented'); 
  }

  findAll(filters){
    filters = filters || {};
    let where = { where : filters };
    return utils.executeModel(
      this.sequelize,
      this.models.<%=name %>,
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
      this.models.<%=name %>,
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