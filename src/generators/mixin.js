var config = require('../util/config');
var fs = require('../util/fs');
var inflector = require('../util/inflector');
var msg = require('../util/message');

module.exports = function (resource) {
    var resourceName = inflector.underscore(inflector.singularize(resource));
    fs.writeGenerator('mixin', resourceName, {
        objectName: inflector.objectify(resourceName),
        force: config().force
    });
};

