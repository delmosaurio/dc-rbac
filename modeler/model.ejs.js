// <%= name %>
//
<% Object.keys(fields).forEach(function(key){ -%>
// <%= key %>
<% }); %>
export default function(sequelize, DataTypes) {
  return sequelize.define('<%= name %>', {
    
    <% Object.keys(params).forEach(function(key){ -%>
      <%- key %> : {
        <% Object.keys(params[key]).forEach(function(prop){ -%>
          <% if (prop === 'type') { %>
            type: <%- params[key][prop] -%>,
          <% } else {%>
            <%- prop %>: <%- JSON.stringify(params[key][prop], null, 2) -%>,
          <% }%>
        <% }); %>
      },
    <% }); %>

  },
  {
    tableName: '<%= name %>',
    <%if (name === 'users') { %>
    timestamps: true,
    <% } else {%>
    timestamps: false,
    <% }%>
    freezeTableName: true,
    <%if (name === 'users') { %>
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    <% }%>
  });
}