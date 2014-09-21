var dbConfig = require('config').database;

module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      unit: {
        options: {
          reporter: 'list'
        },
        src: [ 'test/unit/**/*.js' ]
      }
    },
    fixtures: {
      importTestData: {
        src: [ 'fixtures/*data.json' ],
        models: function () {
          return require('./models');
        }
      }
    },
    sequelize: {
      options: {
        migrationsPath: __dirname + '/migrations',
        // The following is the sequelize config you're used to
        dialect:  dbConfig.options.dialect,
        username: dbConfig.username,
        database: dbConfig.name,
        host:     dbConfig.host
      }
    },
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('sequelize-fixtures');
  grunt.loadNpmTasks('grunt-sequelize');

  grunt.registerTask('prepare', []);
  grunt.registerTask('build', ['sequelize:migrate']);
  // grunt.registerTask('clean', ['sequelize:undo']); // TODO undo doesn't appear to work in the NPMd version of this task
  grunt.registerTask('test', ['mochaTest:unit']);
  grunt.registerTask('install', ['prepare', 'build', 'test']);
};
