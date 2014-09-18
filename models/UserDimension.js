module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserDimension', {
    id: DataTypes.INTEGER,
    github_username: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'user_dim'
  });
};
