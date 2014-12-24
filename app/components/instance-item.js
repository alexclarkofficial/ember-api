import Ember from "ember";
var alias = Ember.computed.alias;
var not = Ember.computed.not;
var run = Ember.run;
var get = Ember.get;

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
  isVisible: not('isPrivate'),
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
    if(!this.get('isVisible')){ return; }

    var router = get(this, 'router');
    var name = get(this, 'item.name');
    var element = this.get('element');
    var offset = 20;
    var routeName = get(this, 'routeName');

    if(router.isActive(routeName, name)) {
      window.scrollTo(0, this.$().offset().top - offset);
    }

    var wayPoint = new window.Waypoint({
      element: element,
      continuous: false,
      enabled: false,
      offset: offset,
      handler: function(direction) {
        router && router.replaceWith(routeName, name);
      }
    });
    wayPoint.enable();

    this.set('waypoint', wayPoint);
  }
});
