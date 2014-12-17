import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return [{
      name: 'ready',
      description: '<p>Called when the Application has become ready. The call will be delayed until the DOM has become ready.</p>',
      file: 'packages/ember-application/lib/system/application.js',
      line: '749'
    }]
  }
});
