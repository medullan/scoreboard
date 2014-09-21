module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TimeDimension', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    month: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    year: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'time_dim'
  });
};
