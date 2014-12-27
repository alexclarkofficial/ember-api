import Ember from "ember";

export default Ember.View.extend({
  returnToTopLinkVisible: false,
  actions: {
    scrollToTop: function(){
      window.scrollTo(0,0);
    }
  },
  didInsertElement: function(){
    var view = this;
    new window.Waypoint({
      element: this.element,
      continuous: false,
      offset: 40,
      handler: function(direction) {
        if (direction === 'down') {
          view.set('returnToTopLinkVisible', true);
        }
        if (direction === 'up') {
          view.set('returnToTopLinkVisible', false);
        }
      }
    });
  }
});
