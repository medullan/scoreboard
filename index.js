var express = require('express'),
  bodyParser = require('body-parser'),
  buildApi = require('./routes/api/build'),
  scoreApi = require('./routes/api/score');

var app = express();

app.route('/api/build')
  .post(buildApi.create);

app.route('/api/scoreboard')
  .get(scoreApi.getByProject);

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port %d', server.address().port);
});
