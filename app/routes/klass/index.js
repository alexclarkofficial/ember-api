import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return {
      methods: [
        {name: 'advanceReadiness', isPrivate: false, inheritedFrom: null},
        {name: 'deferReadiness', isPrivate: false, inheritedFrom: null},
        {name: 'initializer', isPrivate: false, inheritedFrom: null},
        {name: 'inject', isPrivate: false, inheritedFrom: null},
        {name: 'register', isPrivate: false, inheritedFrom: null},
        {name: 'reset', isPrivate: false, inheritedFrom: null}
      ],
      properties: [
        {name: 'customEvents'},
        {name: 'eventDispatcher'},
        {name: 'resolver'},
        {name: 'rootElement'}
      ],
      events: [
        {name: 'didWhatever'}
      ]
    }
  }
});
