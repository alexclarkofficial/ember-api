import Ember from "ember";
import HasWaypoint from "../mixins/views/has-waypoint";

export default Ember.Component.extend(HasWaypoint, {
  model: null,
  'show-private': false,
  'show-protected': false,
  'show-deprecated': false,
  'show-inherited': false,
  classNames: ['class-items'],
  routeName: null,
  activeChild: false,
  scrollTo: function(){
    if (!this.get('activeChild')) {
      window.scrollTo(0, this.$().offset().top);
    }
  },
  waypointBecameActive: function(){
    var router = this.get('router');
    var routeName = this.get('routeName');
    router.replaceWith(routeName);
  },
  actions: {
    childBecameActiveWaypoint: function(){
      this.set('activeChild', true);
    }
  },
});
