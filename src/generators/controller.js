var config = require('../util/config');
var fs = require('../util/fs');
var inflector = require('../util/inflector');
var msg = require('../util/message');

module.exports = function(resource) {
  var resourceName = inflector.underscore(resource)+'_controller';
  fs.writeGenerator('controller', resourceName, {
    objectName: inflector.objectify(resourceName),
    controllerType: config().force?'':promptControllerType(),
    force: config().force
  });
};

function promptControllerType() {
  var userInput = msg.prompt('What kind of controller: object, array, or neither? [o|a|n]');
  return controllerTypeMap[userInput];
}

var controllerTypeMap = {
  'n': '',
  'neither': '',
  'o': 'Object',
  'object': 'Object',
  'a': 'Array',
  'array': 'Array'
};

