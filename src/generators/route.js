var template = require('../util/template');
var inflector = require('../util/inflector');

module.exports = function(resource, program) {
  var resourceName = inflector.underscore(resource) + '_route';
  return template.generate('route', resourceName, {
    objectName: inflector.objectify(resourceName)
  });
};

