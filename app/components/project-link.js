import Ember from "ember";
var get = Ember.get;

export default Ember.Component.extend({
  file: null,
  line: null,
  tagName: 'a',
  attributeBindings: ['href'],
  href: function(){
    var sha = window.SHA;
    var url = window.GITHUBURL;

    return "%@/tree/%@/%@#L%@".fmt(url, sha, get(this, 'file'), get(this, 'line'));
  }.property('file', 'line')
});
