import Ember from "ember";
var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend({
  tagName: 'input',
  value: null,
  attributeBindings: ['type', 'checked'],
  type: 'checkbox',
  setupEventListener: function(){
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
