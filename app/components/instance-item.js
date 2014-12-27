import Ember from "ember";
var alias = Ember.computed.alias;
var get = Ember.get;
var observer = Ember.observer;
var run = Ember.run;

function resetAllWaypoints(){
  window.Waypoint.refreshAll();
}

export default Ember.Component.extend({
  item: null,
  itemType: null,
  routeName: null,

  id: function(){
    return "%@_%@".fmt(get(this, 'itemType'), get(this, 'item.name'));
  }.property('item.name', 'itemType').readOnly(),
  isPrivate: alias('item.isPrivate'),
  classNames: ['property', 'item-entry'],
  classNameBindings: ['isPrivate:private'],
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
  _visibilityChanged: observer('isVisible', function() {
    run.scheduleOnce('afterRender', this, resetAllWaypoints);
  }),
  /**
    The URL where you cand find the code for this property on github.
    TODO: don't link to blob/master,
    link to tree/<commit SHA: e.g. 5fe2d63>
    "https://github.com/emberjs/ember.js/tree/5fe2d63/packages/ember-application/lib/system/application.js#L551"

    @returns String
  */
  codeLocation: function(){
    return 'https://github.com/emberjs/ember.js/blob/master/%@#L%@'.fmt(get(this, 'item.file'), get(this, 'item.line'));
  }.property('item.file', 'item.line').readOnly(),

  /**
    Until the router becomes a service, this is the crazy way we need to get
    access to the router.
  */
  router: function(){
    return this.container.lookup('router:main');
  }.property(),

  willDestroyElement: function(){
    var waypoint = this.get('waypoint');
    if (waypoint) {
      waypoint.destroy();
    }
  },

  didInsertElement: function(){
    var router = get(this, 'router');
    var name = get(this, 'item.name');
    var element = this.get('element');
    var offset = 20;
    var routeName = get(this, 'routeName');

    if(this.get('isVisible')){
      if(router.isActive(routeName, name)) {
        window.scrollTo(0, this.$().offset().top - offset);
      }
    }

    var wayPoint = new window.Waypoint({
      element: element,
      continuous: false,
      enabled: false,
      offset: offset,
      handler: function() {
        if(router){ router.replaceWith(routeName, name); }
      }
    });
    wayPoint.enable();

    this.set('waypoint', wayPoint);
  }
});
