import Ember from "ember";
import config from '../config/environment';

export default Ember.Controller.extend({
  rev: config.rev,
  sha: config.sha,
  githubHREF: function(){
    return "%@/commits/%@".fmt(config.githubUrl, config.sha);
  }.property()
});
