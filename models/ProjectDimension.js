module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProjectDimension', {
    id: DataTypes.INTEGER,
    codeship_project_id: DataTypes.INTEGER,
    codeship_project_name:  DataTypes.STRING
  }, {
    timestamps: false,
    tableName: "project_dim"
  });
};
