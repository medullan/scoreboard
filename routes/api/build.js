module.exports = {
  create: function(req, res) {
    res.type('application/json');
    res.status('200');
    res.send({ status: 'ok '});
  }
};
