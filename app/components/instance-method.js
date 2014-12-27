import InstanceItemComponent from "./instance-item";
import Ember from 'ember';

var get = Ember.get;

export default InstanceItemComponent.extend({
  itemType: 'method',
  routeName: 'klass.methods.method',
  parameterSentence: function(){
    return get(this, 'item.params').mapProperty('name').join(', ');
  }.property('item.params.@each')
});
