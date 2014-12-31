import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ['private', 'deprecated', 'inherited', 'protected'],
  private: false,
  deprecated: false,
  inherited: false,
  protected: false,
  actions: {
    updateFilter: function(filter, value){
      // if any filter changes, we can refresh all the waypoints.
      // this is a bit aggressive for waypoints not based on filtering
      // but the number of those is quite low so this saves on some
      // mental overhead.
      window.Waypoint.refreshAll();

      var queryParams = {};
      queryParams[filter] = value;
      this.transitionToRoute({queryParams: queryParams});
    }
  }
});
