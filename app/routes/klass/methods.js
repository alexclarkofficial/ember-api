import Ember from "ember";
import ajax from "ic-ajax";
import config from '../../config/environment';

export default Ember.Route.extend({
  model: function(){
    var name = this.modelFor('klass').name;
    return ajax('/%@/docs/%@/methods.json'.fmt(config.baseURL, name));
  }
});
