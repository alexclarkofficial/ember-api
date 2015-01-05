import Ember from "ember";
import ajax from "ic-ajax";
import config from '../config/environment';

export default Ember.Route.extend({
  model: function(){
    return ajax('/%@/docs/index.json'.fmt(config.baseURL));
  }
});
