import Ember from "ember";
import ajax from "ic-ajax";
import config from '../config/environment';

export default Ember.Route.extend({
  model: function(params){
    return ajax('/%@/docs/%@.json'.fmt(config.baseURL, params.classId));
  },
  afterModel: function(){
    // megajank. View#willDestroyElement is scheduled after
    // route entering. Not sure where to properly schedule this.
    setTimeout(function(){
      window.scrollTo(0,0);
    }, 10);
  }
});

