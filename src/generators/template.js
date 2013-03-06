var template = require('../util/template');
var inflector = require('../util/inflector');

module.exports = function(resource) {
  var resourceName = inflector.underscore(resource);
  return template.generate('template', resourceName, {name: resource});
};

