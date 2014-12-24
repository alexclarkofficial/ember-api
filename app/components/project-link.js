import Ember from "ember";
var get = Ember.get;

export default Ember.Component.extend({
  file: null,
  line: null,
  tagName: 'a',
  attributeBindings: ['href'],
  href: function(){
    return "https://github.com/emberjs/ember.js/tree/5fe2d63/%@#L%@".fmt(get(this, 'file'), get(this, 'line'));
  }.property('file', 'line')
});
