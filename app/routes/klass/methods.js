import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return [{
      name: '_initialize',
      description: '<p>Initialize the application. This happens automatically.</p><p>Run any initializers and run the application load hook. These hooks may choose to defer readiness. For example, an authentication hook might want to defer readiness until the auth token has been retrieved.</p>',
      file: 'packages/ember-application/lib/system/application.js',
      line: '551',
      parameters: [
        {name: 'target', type: 'String|Object', description: 'A target object or a function'}
      ]
    }]
  }
});
