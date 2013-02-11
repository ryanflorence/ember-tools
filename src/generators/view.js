var template = require('../util/template');
var inflector = require('../util/inflector');

module.exports = function(resource, program) {
  var resourceName = inflector.underscore(resource) + '_view';
  return template.generate('view', resourceName, {
    objectName: inflector.objectify(resourceName)
  });
};

