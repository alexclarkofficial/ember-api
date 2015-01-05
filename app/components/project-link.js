import Ember from "ember";
var get = Ember.get;
import config from '../config/environment';

export default Ember.Component.extend({
  file: null,
  line: null,
  tagName: 'a',
  attributeBindings: ['href'],
  href: function(){
    return "%@/tree/%@/%@#L%@".fmt(config.githubUrl, config.sha, get(this, 'file'), get(this, 'line'));
  }.property('file', 'line')
});
