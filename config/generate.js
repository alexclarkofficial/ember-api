/* jshint node: true */

var fs = require('fs');
var yuidocOutput = JSON.parse(fs.readFileSync('./data.json', {encoding: ''}));

// low frills object clone.
function copy(object){
  return JSON.parse(JSON.stringify(object));
}

// used to generate methods on the Klass prototype.
function filterItemType(type){
  return function(){
    return this.items().filter(function(item){
      item.itemtype === type;
    });
  }
}


function Klass(name){
  this.name = name;
  this.classItems = {};
  if (yuidocOutput.classes[name]) {
    this.yuidocData = yuidocOutput.classes[name];
  } else {
    throw("no data for " + name + " in data")
  }
}


Klass.prototype = {
  items: function(){
    if (this.hasOwnProperty('_items')) { return this._items; }

    var itemsKeyedByName = {};

    var parents = [this.extends()];
    parents = parents.concat(this.uses());
    parents = parents.filter(function(i) { return !!i; }); // removes nulls

    // walk up the parent/uses tree and get the full
    // list of all "items" avaiable in this object type,
    // noting where the item originated.
    parents.forEach(function(parent){
      parent.items().forEach(function(item){
        var itemCopy = copy(item);
        itemCopy.inheritedFrom = itemCopy.inheritedFrom || parent.name;
        itemsKeyedByName[itemCopy.name] = itemCopy;
      });
    });

    // loop through every class item in the entire library looking for
    // items for only this class, adding them to the collection of
    // items keyed by name
    yuidocOutput['classitems'].forEach(function(classItem){
      if(classItem['class'] === this.name) {
        itemsKeyedByName[classItem.name] = copy(classItem);
      }
    }, this);

    this._items = Object.keys(itemsKeyedByName).map(function(key){ return itemsKeyedByName[key]; });
    return this._items;
  },
  methods: filterItemType('method'),
  properties: filterItemType('property'),
  events: filterItemType('event'),
  extends: function(){
    if (this.hasOwnProperty('_extends')) { return this._extends; }

    var extended = this.yuidocData['extends'];
    console.log(yuidocOutput['classes'][this.name]);

    if (extended && yuidocOutput['classes'][this.name]) {
      this._extends = Klass.find(extended);
    } else {
      this._extends = null;
    }

    return this._extends;
  },
  uses: function(){
    if (this.hasOwnProperty('_uses')) { return this._uses; }

    var uses = this.yuidocData['uses'] || [];

    this._uses = uses.map(function (use){return Klass.find(use)});
    return this._uses;
  }
}



/*
  cache the transforms from YUIDoc format to the format we use
  for docs.
*/
Klass.classes = {};

/*
  Create (and cache) a transformed class or return an already
  cached class object
*/
Klass.find = function(name){
  var klass = Klass.classes[name] || new Klass(name);
  Klass.classes[name] = klass;
  return klass;
}



// start processing
// var items = Object.keys(yuidocOutput['classes']).map(function(className){
//   return Klass.find(yuidocOutput['classes'][className].name).items();
// });

fs.writeFileSync('out.json', JSON.stringify(Klass.find('Ember.View').items(), null, 2))
