import Ember from "ember";
var get = Ember.get;
var set = Ember.set;

/*
  EventedCheckbox is a checkbox component that doesn't
  rely on two-way data binding as a communcation of
  selection state, instead have a configurable event
  when a checkbox is check or unchecked.

  ```handlebars
  {{evented-checkbox value=someProp action="someActionName"}}
  ```

  In the above example, the checked vlaue of the checkbox is bound
  to the value of `someProp` and will trigger the action `'someActionName'`
  on the outer context.
*/
export default Ember.Component.extend({
  tagName: 'input',
  value: null,
  attributeBindings: ['type', 'checked'],
  type: 'checkbox',
  _setupEventListener: function(){
    this.on('change', this, this._triggerAction);
    this.on('change', this, this._updateElementValue);

  }.on('init'),
  _triggerAction: function(){
    var checked = this.$().prop('checked');
    this.sendAction('action', get(this, 'value'), checked);
  },
  _updateElementValue: function(){
    set(this, 'checked', this.$().prop('checked'));
  }
});
