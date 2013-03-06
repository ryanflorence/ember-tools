var template = require('../util/template');
var inflector = require('../util/inflector');

module.exports = function(resource, env) {
  var resourceName = inflector.underscore(inflector.singularize(resource));
  return template.generate('model', resourceName, {
    fields: env.fields,
    objectName: inflector.objectify(resourceName)
  }, true);
};

