var template = require('../util/template');
var inflector = require('../util/inflector');

module.exports = function(resource, program) {
  var resourceName = inflector.underscore(inflector.singularize(resource));
  return template.generate('mixin', resourceName, {
    objectName: inflector.objectify(resourceName)
  }, true);
};

