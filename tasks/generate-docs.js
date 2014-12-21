/* jshint node: true */
var fs = require('fs');
var yuidoc = require('./generate-docs/yuidoc');
var toJSON = require('./generate-docs/utils').toJSON;
var eachValue = require('./generate-docs/utils').eachValue;
var Klass = require('./generate-docs/data');

/************** 2. Object Building ***********/
/*
  The data object for the application itself:
  {
    modules: [{name: '...'}],
    namepsaces: [{name: '...'}],
    classes:  [{name: '...'}]
  }

  These are all sorted alphabetically.
*/

var sortByNameProperty = require('./generate-docs/utils').sortByNameProperty;
var appJSON = {
  namespaces: [],
  classes: []
};

/* Pull each submodule object from the YUIDoc output. It's in the format

    {
      submodules: {
        "A.Name": 1
        "A.AnotherName": 1
      }
    }

    and needs to be an array of
    [{name: 'A.Name'}, {name: 'A.Other'}]
*/
appJSON.modules = Object.keys(yuidoc.modules.ember.submodules).map(function(submodule){
  return {name: submodule};
}).sort(sortByNameProperty);

/*


*/
eachValue(yuidoc.classes, function(klass){
  if (klass.static) {
    appJSON.namespaces.push({name: klass.name})
  } else {
    appJSON.classes.push({name: klass.name})
  }
});

appJSON.namespaces.sort(sortByNameProperty);
appJSON.classes.sort(sortByNameProperty);

/************** 3. Writing Files **************/
/*
  Write the file used for the sidebar navigation:

    s3-bucket/
      1.x.x/
        index.json

  ```index.json
    {
      namespaces: [{name: 'Ember.Somenamespcce'}, ...],
      modules: [{name: 'some-module'}, ...],
      classes: [{name: 'Ember.SomeClass'}, ...]
    }
  ```
*/
fs.writeFileSync(__dirname + '/docs/' + 'index.json', toJSON(appJSON));

// write out the files for each Class
var typePlurals = {
  'method': 'methods',
  'property': 'properties',
  'event': 'events'
};

/*
  Write the files for each class:
    s3-bucket/
      1.x.x/
        Ember.SomeClass.json
        Ember.SomeClass/
          index.json
          methods.json
          properties.json
          events.json
*/
var items = Object.keys(yuidoc['classes']).map(function(className){
  var directory = __dirname + '/docs/' + className;

  /*
    Write the class file:
      s3-bucket/
        1.x.x/
          Ember.SomeClass.json

  */
  fs.writeFileSync(directory + '.json', toJSON(yuidoc['classes'][className]))

  // create the `Ember.SomeClass/` directory for additional detailed json files
  fs.mkdirSync(directory);

  // find this class by name
  var klass = Klass.find(className);

  var indexJSON = {
    methods: [],
    properties: [],
    events: []
  }

  klass.items().forEach(function(item){
    var json = {
      name: item.name,
      isPrivate: item.access === 'private',
      inheritedFrom: item.inheritedFrom
    }

    switch (item.itemtype) {
      case "property":
        indexJSON.properties.push(json)
        break;
      case "method":
        indexJSON.methods.push(json)
        break;
      case "event":
        indexJSON.events.push(json)
        break;
    }
  });

  /*
      Write the index file for the class:
        s3-bucket/
          1.x.x/
            Ember.SomeClass/
              index.json

  */
  fs.writeFileSync(directory + '/index.json', toJSON(indexJSON));

  /*
      Write the methods, properties, events files:
        s3-bucket/
          1.x.x/
            Ember.SomeClass/
              methods.json
              properties.json
              events.json

  */
  ['method', 'property', 'event'].forEach(function(type){
    var items = klass.items().filter(function(item){
      return item.itemtype === type;
    });

    fs.writeFileSync(directory + '/' + typePlurals[type] + '.json', toJSON(items));
  });
});

