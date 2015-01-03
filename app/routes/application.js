import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Route.extend({
  model: function(){
    return ajax('/docs/index.json').then(function(response){
      window.SHA = response.sha;             // just being lazy here.
      window.GITHUBURL = response.githubUrl; // <-----

      return response;
    });
  }
});
