var fs = require('../util/fs');
var inflector = require('../util/inflector');
var msg = require('../util/message');

module.exports = function(resource) {
  var resourceName = inflector.underscore(inflector.singularize(resource));
  fs.writeGenerator('mixin', resourceName, {
    objectName: inflector.objectify(resourceName),
    mixinType: promptMixinType()
  });
};

function promptMixinType() {
  var isControllerMixin = msg.confirm('Is this a controller mixin?');
  return isControllerMixin ? 'Controller' : '';
}

