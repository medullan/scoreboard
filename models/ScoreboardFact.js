module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ScoreboardFact', {
    project_id: DataTypes.INTEGER,
    time_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    breaks_count: DataTypes.INTEGER,
    success_count: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'scores_fact'
  });
};
