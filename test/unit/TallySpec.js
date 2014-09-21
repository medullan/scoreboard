var models = require('../../models')
, config = require('config').database
, pg = require('pg')
, expect = require('chai').expect
, util = require('util')
, q = require('q')
, fixer = require('fixer')
, fixtures = require('../fixtures');

describe('Tally', function() {

  describe('#compute', function() {

    beforeEach(function(done) {
      debugger;
      fixer(fixtures, models).load(function(err) {
        if(err) {
          return console.log(err);
        } else {
          done();
        }
      });
    });

    it('should do nothing of consequence', function(done) {
      done();
    });

    xit('should tally by failures for each user', function() {
      var project_name = 'sample/sample';
      var project_id = 1000;
      var username = 'johndoe';
      var status = 'error';

      var day = 28;
      var month = 6;
      var year = 2014;

      // get the relevant dimensions (in this test, they all exist)

      var time, project, user, score;

      // first, the date
      return models.TimeDimension.findOrCreate({'month': month, 'day': day, 'year': year})
      .spread(function(time_result, created) {
        expect(created).to.be.falsy;
        expect(time_result).to.not.be.null;
        time = time_result;
        return models.ProjectDimension.findOrCreate({ 'codeship_project_id': project_id });
      }).spread(function(project_result, created) {
        expect(created).to.be.falsy;
        expect(project_result).to.not.be.undefined;
        expect(project_result.codeship_project_name).to.equal('sample/sample');
        project = project_result;
        return models.UserDimension.findOrCreate({'github_username': username});
      }).spread(function(user_result, created) {
        expect(created).to.be.falsy;
        user = user_result;
        return models.ScoreboardFact.findOrCreate({'time_id': time.id, 'user_id': user.id, 'project_id': project.id});
      }).spread(function(fact_result, created) {
        expect(created).to.be.falsy;
        return fact_result.increment('breaks_count', { by: 1 });
      }).then(function(fact_result) {
        expect(fact_result.breaks_count).to.equal(4);
        score = fact_result;
      });
    });

    xit('should tally by successes for each user', function() {
      var project_name = 'sample/sample';
      var project_id = 1000;
      var username = 'johndoe';
      var status = 'success';

      var day = 28;
      var month = 6;
      var year = 2014;

      // get the relevant dimensions (in this test, they all exist)

      var time, project, user, score;

      // first, the date
      return models.TimeDimension.findOrCreate({'month': month, 'day': day, 'year': year})
      .spread(function(time_result, created) {
        expect(created).to.be.falsy;
        time = time_result;
        return models.ProjectDimension.findOrCreate({ 'codeship_project_id': project_id });
      }).spread(function(project_result, created) {
        expect(created).to.be.falsy;
        expect(project_result.codeship_project_name).to.equal('sample/sample');
        project = project_result;
        return models.UserDimension.findOrCreate({'github_username': username});
      }).spread(function(user_result, created) {
        expect(created).to.be.falsy;
        user = user_result;
        return models.ScoreboardFact.findOrCreate({'time_id': time.id, 'user_id': user.id, 'project_id': project.id});
      }).spread(function(fact_result, created) {
        expect(created).to.be.falsy;
        return fact_result.increment((status === 'error') ? 'breaks_count' : 'success_count', { by: 1 });
      }).then(function(fact_result) {
        expect(fact_result.success_count).to.equal(6);
        score = fact_result;
      });
    });

    xit('should tally by successes for each user when theres a new day', function() {
      var project_name = 'sample/sample';
      var project_id = 1000;
      var username = 'johndoe';
      var status = 'success';

      var day = 29;
      var month = 6;
      var year = 2014;

      // get the relevant dimensions (in this test, they all exist)

      var time, project, user, score;

      // first, the date
      return models.TimeDimension.findOrCreate({'month': month, 'day': day, 'year': year})
      .spread(function(time_result, created) {
        expect(created).to.be.truthy;
        time = time_result;
        return models.ProjectDimension.findOrCreate({ 'codeship_project_id': project_id });
      }).spread(function(project_result, created) {
        expect(project_result.codeship_project_name).to.equal('sample/sample');
        project = project_result;
        return models.UserDimension.findOrCreate({'github_username': username});
      }).spread(function(user_result, created) {
        expect(created).to.be.falsy;
        user = user_result;
        return models.ScoreboardFact.findOrCreate({'time_id': time.id, 'user_id': user.id, 'project_id': project.id});
      }).spread(function(fact_result, created) {
        expect(created).to.be.falsy;
        return fact_result.increment((status === 'error') ? 'breaks_count' : 'success_count', { by: 1 });
      }).then(function(fact_result) {
        expect(fact_result.success_count).to.equal(1);
        score = fact_result;
      });
    });

    /*
    afterEach(function() {
      return models.ScoreboardFact.destroy().then(function() {
        return models.TimeDimension.destroy();
      }).then(function() {
        return models.ProjectDimension.destroy();
      }).then(function() {
        return models.UserDimension.destroy();
      });
    });
    */
  });

});
