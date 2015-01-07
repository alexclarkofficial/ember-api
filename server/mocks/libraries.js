module.exports = function(app) {
  var express = require('express');
  var librariesRouter = express.Router();
  librariesRouter.get('*', function(req, res) {
    res.send([
      {name: 'Ember.js', slug: '/ember.js'},
      {name: 'Ember Data', slug: '/ember-data'},
      {name: 'RSVP', slug: '/rsvp'}
    ]);
  });
  app.use('/config/libraries.json', librariesRouter);
};
