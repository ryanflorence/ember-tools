var fs = require('../util/fs');
var inflector = require('../util/inflector');

module.exports = function(resource) {
  var resourceName = inflector.underscore(resource)+'_controller';
  fs.writeGenerator('controller', resourceName, {
    objectName: inflector.objectify(resourceName)
  });
};

