import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Route.extend({
  model: function(){
    var name = this.modelFor('klass').name;
    return ajax('/docs/' + name + '/index.json');
  }
});
