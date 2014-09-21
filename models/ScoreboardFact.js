module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ScoreboardFact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    breaks_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    success_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false,
    tableName: 'scores_fact'
  });
};
