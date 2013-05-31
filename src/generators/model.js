var fs = require('../util/fs');
var inflector = require('../util/inflector');

module.exports = function(resource, env) {
  var resourceName = inflector.underscore(inflector.singularize(resource));
  fs.writeGenerator('model', resourceName, {
    fields: env.fields,
    objectName: inflector.objectify(resourceName)
  });
};

