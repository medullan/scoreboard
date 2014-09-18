var rest = require('restler');

module.exports = {
  to: function(webhook) {
    rest.post(webhook, null);
  }
};
