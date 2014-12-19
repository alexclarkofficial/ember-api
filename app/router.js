import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('namespace', {path: '/module/:namespaceId'});
  this.resource('module', {path: '/namespace/:namespaceId'});

  this.resource('klass', {path: '/class/:classId'}, function(){
    this.route('index', {path: '/'});
    this.route('methods');
    this.route('properties');
    this.route('events');
  });
});

export default Router;
