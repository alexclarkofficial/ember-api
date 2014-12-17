import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return {
      name: 'Ember.Application',
      file: 'packages/ember-application/lib/system/application.js',
      line: '56',
      location: 'packages/ember-application/lib/system/application.js:56',
      'extends': 'Ember.Namespace',
      module: 'ember-application',
      description: "<p>An instance of <code>Ember.Application</code> is the starting point for every Ember application. It helps to instantiate, initialize and coordinate the many objects that make up your app.</p>"
    }
  }
});
