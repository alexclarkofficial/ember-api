import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Route.extend({
  model: function(params){
    return ajax('/docs/' + params.classId + '.json');
  },
  afterModel: function(){
    // megajank. View#willDestroyElement is scheduled after
    // route entering. Not sure where to properly schedule this.
    setTimeout(function(){
      window.scrollTo(0,0);
    }, 10);
  }
});
