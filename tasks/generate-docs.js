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

    ```Ember.SomeClass.json
    {
      isPrivate: false,
      description: "<p>some html</p>",
      extends: "Ember.Object",
      file: "packages/ember-runtime/lib/system/each_proxy.js",
      line: 94,
      module: "ember",
      name: "Ember.EachProxy",
      submodule: "ember-runtime"
      methods: [],
      properties: [],
      events: []
    }
    ```

  */
  var klassJSON = yuidoc['classes'][className];
  klassJSON.methods = [];
  klassJSON.properties = [];
  klassJSON.events = [];
  klassJSON.isPrivate = klassJSON.access === 'private';
  klassJSON.constType = klassJSON.static ? 'Namespace' : 'Class';


  // find this class by name
  var klass = Klass.find(className);
  klass.items().forEach(function(item){
    var json = {
      name: item.name,
      isPrivate: item.access === 'private',
      inheritedFrom: item.inheritedFrom
    }

    switch (item.itemtype) {
      case "property":
        klassJSON.properties.push(json)
        break;
      case "method":
        klassJSON.methods.push(json)
        break;
      case "event":
        klassJSON.events.push(json)
        break;
    }
  });

  fs.writeFileSync(directory + '.json', toJSON(yuidoc['classes'][className]))

  // create the `Ember.SomeClass/` directory for additional detailed json files
  fs.mkdirSync(directory);

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

/*
  Write the module files:
    s3-bucket/
      1.x.x/
        modules/
          some-module.json


  ```some-module.json
    {
      name: 'some-module',
      description: '<p>some paresed markdown</p>'
      submodules: [{name: 'another-module'}, ...],
      classes: [{name: 'Namesapce.SomeClass'}, ...]
      requires: [{name: 'some-other-module'}, ...]

    }
  ```

*/
fs.mkdirSync(__dirname + '/docs/modules');
eachValue(yuidoc['modules'], function(module){
  var directory = __dirname + '/docs/modules';
  var json = {
    name: module.name,
    classes: Object.keys(module.classes).sort().map(function(name) { return {name: name}}),
    submodules: Object.keys(module.classes).sort().map(function(name) { return {name: name}}),
    requires: (module.requires ||[]).sort().map(function(name) { return {name: name}})
  }
  fs.writeFileSync(directory + '/' + module.name + '.json', toJSON(json));
});
