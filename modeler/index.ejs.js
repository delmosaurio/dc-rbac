'use strict';

<% Object.keys(tables).forEach(function(table){ -%>
import <%= _.camelCase(table) %> from  './<%-  table%>';
<% }); %>


export default class Models {
  constructor(sequelize, DataTypes){
  <% Object.keys(tables).forEach(function(table){ -%>
  this.<%= _.camelCase(table) %> = <%= _.camelCase(table) %>(sequelize, DataTypes);
  <% }); %>
  }
}