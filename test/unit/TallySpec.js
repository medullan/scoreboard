var models = require('../../models')
  , config = require('config').database
  , pg = require('pg')
  , expect = require('chai').expect
  , util = require('util');

describe('Middleware: tally', function() {

  describe('Method: compute', function() {

    it('it should tally by failures for each user', function(done) {
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
      models.TimeDimension.findOrCreate({'month': month, 'day': day, 'year': year})
        .then(function(time_result) {
          expect(time_result.id).to.equal(1);
          time = time_result;
          return models.ProjectDimension.findOrCreate({ 'codeship_project_id': project_id });
        }).then(function(project_result) {
          expect(project_result.codeship_project_name).to.equal('sample/sample');
          project = project_result;
          return models.UserDimension.findOrCreate({'github_username': username});
        }).then(function(user_result) {
          expect(user_result.id).to.equal(1);
          user = user_result;
          return models.ScoreboardFact.findOrCreate({'time_id': time.id, 'user_id': user.id, 'project_id': project.id});
        }).then(function(fact_result) {
          return fact_result.increment('breaks_count', 1);
        }).then(function(fact_result) {
          expect(fact_result.breaks_count).to.equal(4);
          score = fact_result;
          done();
        });
    });

    it('it should tally by successes for each user', function(done) {
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
      models.TimeDimension.findOrCreate({'month': month, 'day': day, 'year': year})
        .then(function(time_result) {
          expect(time_result.id).to.equal(1);
          time = time_result;
          return models.ProjectDimension.findOrCreate({ 'codeship_project_id': project_id });
        }).then(function(project_result) {
          expect(project_result.codeship_project_name).to.equal('sample/sample');
          project = project_result;
          return models.UserDimension.findOrCreate({'github_username': username});
        }).then(function(user_result) {
          expect(user_result.id).to.equal(1);
          user = user_result;
          return models.ScoreboardFact.findOrCreate({'time_id': time.id, 'user_id': user.id, 'project_id': project.id});
        }).then(function(fact_result) {
          return fact_result.increment((status === 'error') ? 'breaks_count' : 'success_count', 1);
        }).then(function(fact_result) {
          expect(fact_result.success_count).to.equal(6);
          score = fact_result;
          done();
        });
    });

    afterEach(function(done) {
      models.ScoreboardFact.find(1)
        .then(function(fact) {
          fact.breaks_count = 3;
          fact.success_count = 5;
          return fact.save(['breaks_count', 'success_count']);
        }).then(function(fact) {
          expect(fact.breaks_count).to.equal(3);
          expect(fact.success_count).to.equal(5);
          done();
        });
    });

  });

});

/*
{
    "build": {
        "build_url": "https://www.codeship.io/projects/10213/builds/973711",
        "commit_url": "https://github.com/codeship/docs/commit/96943dc5269634c211b6fbb18896ecdcbd40a047",
        "project_id": 10213,
        "build_id": 973711,
        "status": "testing",
        "project_full_name": "codeship/docs",
        "commit_id": "96943dc5269634c211b6fbb18896ecdcbd40a047",
        "short_commit_id": "96943",
        "message": "Merge pull request #34 from codeship/feature/shallow-clone",
        "committer": "beanieboi",
        "branch": "master"
    }
}

*/
