import InstanceItemComponent from "./instance-item";

export default InstanceItemComponent.extend({
  itemType: 'method',
  routeName: 'klass.methods.method',
  parameterSentence: function(){
    return this.get('item.params').mapProperty('name').join(', ');
  }.property('item.params.@each')
});
