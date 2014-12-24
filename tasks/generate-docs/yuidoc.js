var fs = require('fs');
var eachValue = require('./utils').eachValue;
var yuidocOutput = JSON.parse(fs.readFileSync(__dirname + '/../data.json', {encoding: ''}));

/*
  Preprocess all the markdown for classes, methods, properties, and events.

  This saves the cost of rendering to HTML on the client. In the application,
  these properties are all triple stached - {{{ description }}}.
*/
var markdown = require('./markdown');

yuidocOutput.classitems.forEach(function(item){
  item.description = markdown(item.description || '');
});

eachValue(yuidocOutput.classes, function(klass){
  klass.description = markdown(klass.description || '');
});


module.exports = yuidocOutput;
