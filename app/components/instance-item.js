import Ember from "ember";
import HasWaypoint from "../mixins/views/has-waypoint";

var alias = Ember.computed.alias;
var get = Ember.get;

export default Ember.Component.extend(HasWaypoint, {
  /*
    @action
  */
  'became-active': null,

  item: null,
  itemType: null,
  name: alias('item.name'),
  routeName: null,
  id: function(){
    return "%@_%@".fmt(get(this, 'itemType'), get(this, 'item.name'));
  }.property('item.name', 'itemType').readOnly(),
  isPrivate: alias('item.isPrivate'),
  classNames: ['property', 'item-entry'],
  classNameBindings: ['isPrivate:private'],

  scrollTo: function(){
    var router = this.get('router');
    var routeName = this.get('routeName');
    var name = this.get('name');

    if (router.isActive(routeName, name)) {
      window.scrollTo(0, this.$().offset().top);
      this.sendAction('became-active');
    }
  },
  waypointBecameActive: function(){
    var router = this.get('router');
    var routeName = this.get('routeName');
    var name = this.get('name');

    router.replaceWith(routeName, name);
  },

  isVisible: function(){
    if (get(this, 'item.isPrivate')     && !get(this, 'show-private'))   { return false; }
    if (get(this, 'item.inheritedFrom') && !get(this, 'show-inherited')) { return false; }
    if (get(this, 'item.isProtected')   && !get(this, 'show-protected')) { return false; }
    if (get(this, 'item.isDeprecated')  && !get(this, 'show-deprecated')){ return false; }

    return true;
  }.property('show-private', 'show-protected', 'show-deprecated',
             'show-inherited', 'item.isPrivate', 'item.isProtected',
             'item.inheritedFrom', 'item.isDeprecated'),
  /**
    The URL where you cand find the code for this property on github.
    TODO: don't link to blob/master,
    link to tree/<commit SHA: e.g. 5fe2d63>
    "https://github.com/emberjs/ember.js/tree/5fe2d63/packages/ember-application/lib/system/application.js#L551"

    @returns String
  */
  codeLocation: function(){
    return 'https://github.com/emberjs/ember.js/blob/master/%@#L%@'.fmt(get(this, 'item.file'), get(this, 'item.line'));
  }.property('item.file', 'item.line').readOnly()
});
