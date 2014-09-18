module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TimeDimension', {
    id: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    year: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'time_dim'
  });
};
