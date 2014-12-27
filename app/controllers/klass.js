import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ['private', 'deprecated', 'inherited', 'protected'],
  private: false,
  deprecated: false,
  inherited: false,
  protected: false,
  actions: {
    updateFilter: function(filter, value){
      var queryParams = {};
      queryParams[filter] = value;
      this.transitionToRoute({queryParams: queryParams});
    }
  }
});
