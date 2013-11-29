var Ember = require('ember');

Ember.Handlebars.registerBoundHelper('caps', function(val) {
  return val.toUpperCase();
});

