import Ember from "ember";

export default Ember.Mixin.create({
  scrollTo: function(){
    throw new Error("Classes using the HasWaypoint mixin must implement scrollTo");
  },
  waypointBecameActive: function(){
    throw new Error("Classes using the HasWaypoint mixin must implement waypointBecameActive");
  },
  addWaypoint: function(){
    var _this = this;

    var wayPoint = new window.Waypoint({
      element: this.element,
      continuous: false,
      enabled: false,
      handler: function() {
        _this.waypointBecameActive();
      }
    });

    this.set('waypoint', wayPoint);

    if (this.get('isVisible')) {
      this.scrollTo();
      this.enableWaypoint();
    }

  }.on('didInsertElement'),

  enableWaypoint: function(){
    var waypoint = this.get('waypoint');
    waypoint.enable();
  }.on('becameVisible'),

  disableWaypoint: function(){
    var waypoint = this.get('waypoint');
    waypoint.disable();
  }.on('becameHidden'),

  removeWaypoint: function(){
    var waypoint = this.get('waypoint');
    waypoint.destroy();
  }.on('willDestroyElement'),

  /**
    Until the router becomes a service, this is the crazy way we need to get
    access to the router.
  */
  router: function(){
    return this.container.lookup('router:main');
  }.property(),
});
