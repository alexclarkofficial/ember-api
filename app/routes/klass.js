import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Route.extend({
  model: function(params){
    return ajax('/docs/' + params.classId + '.json');
  },
  beforeModel: function(){
    window.scrollTo(0,0);
  }
});
