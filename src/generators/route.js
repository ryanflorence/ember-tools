var fs = require('../util/fs');
var inflector = require('../util/inflector');

module.exports = function(resource) {
  var resourceName = inflector.underscore(resource) + '_route';
  fs.writeGenerator('route', resourceName, {
    objectName: inflector.objectify(resourceName)
  });
};

