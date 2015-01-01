var fs = require('fs');

module.exports = function(app) {
  var express = require('express');
  var docRouter = express.Router();
  docRouter.get('*', function(req, res) {
    var path = __dirname + '/../../dist/docs' + req.path;
    var stream = fs.createReadStream(path);
    stream.on('error', function(e){
      res.status(404).send('not found');
    })

    res.set('Content-Type', 'text/json');
    stream.pipe(res);
  });

  app.use('/docs', docRouter);
};
