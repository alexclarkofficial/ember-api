import Ember from "ember";

export default Ember.View.extend({
  returnToTopLinkVisible: false,
  actions: {
    scrollToTop: function(){
      window.scrollTo(0,0);
    }
  },
  observeScrollState: function(){
    var _this = this;
    new window.Waypoint({
      element: this.element,
      continuous: false,
      offset: 40,
      handler: function(direction) {
        var isReturnToTopLinkVisible = direction === 'down';
        _this.set('returnToTopLinkVisible', isReturnToTopLinkVisible);
      }
    });
  }.on('didInsertElement')
});
