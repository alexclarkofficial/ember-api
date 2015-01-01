import Ember from "ember";

export default Ember.Route.extend({
  redirect: function(){
    var appData = this.modelFor('application');
    this.transitionTo('klass', appData.defaultIndex);
  }
});
