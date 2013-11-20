var config = require('../util/config');
var fs = require('../util/fs');
var inflector = require('../util/inflector');

module.exports = function (resource) {
    var resourceName = inflector.underscore(resource) + '_view';
    fs.writeGenerator('view', resourceName, {
        objectName: inflector.objectify(resourceName),
        force: config().force
    });
};

