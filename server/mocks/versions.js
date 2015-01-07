module.exports = function(app) {
  var express = require('express');
  var versionsRouter = express.Router();
  versionsRouter.get('*', function(req, res) {
    res.send(["v1.7.0", "v1.8.0"]);
  });
  app.use('/*/versions.json', versionsRouter);
};
