import Ember from "ember";
import ajax from "ic-ajax";
import config from '../config/environment';

export default Ember.Route.extend({
  model: function(){
    var libraries = ajax('/config/libraries.json');
    var versions = ajax('/%@/versions.json'.fmt(config.projectName));
    var library  = ajax('/%@/docs/index.json'.fmt(config.baseURL));

    return Ember.RSVP.hash({
      library: library,
      libraries: libraries,
      versions: versions
    }).then(function(responses){
      var library = responses.library;
      library.libraries = responses.libraries;
      library.versions = responses.versions;

      return library;
    });
  },
  actions: {
    versionChanged: function(version){
      var parser = document.createElement('a');
      parser.href = window.location;

      var port = parser.port ? ":%@".fmt(parser.port) : "";
      var location = [parser.protocol, '//', parser.hostname, port, '/', config.projectName, '/', version].join('');

      window.location = location;
    }
  }
});
