var fs = require('../util/fs');
var inflector = require('../util/inflector');

module.exports = function(resource) {
  var resourceName = inflector.underscore(inflector.singularize(resource));
  fs.writeGenerator('mixin', resourceName, {
    objectName: inflector.objectify(resourceName)
  });
};

