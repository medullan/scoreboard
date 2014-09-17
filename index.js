var express = require('express'),
  bodyParser = require('body-parser'),
  buildApi = require('./routes/api/build'),
  scoreApi = require('./routs/api/score');

var app = express();

app.route('/api/build')
  .post(buildApi.create);

app.route('/api/scoreboard')
  .get(scoreApi.getByProject);

app.listen(process.end.PORT || 3000, function() {
  console.log('server listening');
});
