module.exports = {
  up: function(migration, DataTypes, done) {

    migration.createTable('user_dim', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      github_username: {
        type: DataTypes.STRING
      }
    });

    migration.createTable('time_dim', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      day: {
        type: DataTypes.INTEGER,
      },
      month: {
        type: DataTypes.INTEGER
      },
      year: {
        type: DataTypes.INTEGER
      }
    });

    migration.createTable('project_dim', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codeship_project_id: {
        type: DataTypes.INTEGER,
      },
      codeship_project_name: {
        type: DataTypes.STRING
      }
    });

    migration.createTable('scores_fact', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      project_id: {
        type: DataTypes.INTEGER,
        references: 'project_dim',
        referenceKey: 'id'
      },
      time_id: {
        type: DataTypes.INTEGER,
        references: 'time_dim',
        referenceKey: 'id'
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: 'user_dim',
        referenceKey: 'id'
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
    });

    // add altering commands here, calling 'done' when finished
    done();
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('scores_fact');
    migration.dropTable('user_dim');
    migration.dropTable('time_dim');
    migration.dropTable('project_dim');
    
    done();
  }
}
