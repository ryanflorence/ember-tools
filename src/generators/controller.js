var template = require('../util/template');
var inflector = require('../util/inflector');

module.exports = function(resource) {
  var resourceName = inflector.underscore(resource) + '_controller';
  return template.generate('controller', resourceName, {
    objectName: inflector.objectify(resourceName)
  });
};

