var fs = require('fs');
var eachValue = require('./utils').eachValue;
var yuidocOutput = JSON.parse(fs.readFileSync(__dirname + '/../data.json', {encoding: ''}));

/************** Markdown Parsing ***********/
var markdown = require('./markdown');

yuidocOutput.classitems.forEach(function(item){
  item.description = markdown(item.description || '');
});

eachValue(yuidocOutput.classes, function(klass){
  klass.description = markdown(klass.description || '');
});

module.exports = yuidocOutput;
