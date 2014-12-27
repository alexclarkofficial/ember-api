import Ember from "ember";

var alias = Ember.computed.alias;

export default Ember.Mixin.create({
  needs: ['klass'],
  private: alias('controllers.klass.private'),
  deprecated: alias('controllers.klass.deprecated'),
  inherited: alias('controllers.klass.inherited'),
  protected: alias('controllers.klass.protected')
});
