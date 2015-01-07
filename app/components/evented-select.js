import Ember from 'ember';

export default Ember.Select.extend(Ember.TargetActionSupport, {
  target: Ember.computed.alias('controller'),

  onChange: function(){
    this.triggerAction({
      action: this.get('action'),
      actionContext: [this.selection, this._oldValue]
    });
    this._oldValue = this.selection;
  }.on('change')

});
