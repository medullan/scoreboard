module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserDimension', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    github_username: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'user_dim'
  });
};
