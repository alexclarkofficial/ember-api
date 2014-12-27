import Ember from "ember";
var get = Ember.get;

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['type'],
  isVisible: function(){
    if (get(this, 'item.isPrivate') && !get(this, 'show-private')) {
      return false;
    }

    if (get(this, 'item.inheritedFrom') && !get(this, 'show-inherited')) {
      return false;
    }

    if (get(this, 'item.isProtected') && !get(this, 'show-protected')) {
      return false;
    }

    if (get(this, 'item.isDeprecated') && !get(this, 'show-deprecated')) {
      return false;
    }

    return true;
  }.property('show-private', 'show-protected', 'show-deprecated',
             'show-inherited', 'item.isPrivate', 'item.isProtected',
             'item.inheritedFrom', 'item.isDeprecated'),
  'route-name': null,
  'show-private': false,
  'show-protected': false,
  'show-deprecated': false,
  'show-inherited': false
});
