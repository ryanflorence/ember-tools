var config = require('../util/config');
var fs = require('../util/fs');
var inflector = require('../util/inflector');
var msg = require('../util/message');

module.exports = function (resource) {
    var resourceName = inflector.dasherize(resource);
    if (resourceName.indexOf('-') < 0) {
        msg.error("Ember components must have at least one dash (-), ie:\n   ember generate -p em-widget");
    }
    resourceName = inflector.underscore(resource) + '_component';
    var templateName = 'components/' + inflector.dasherize(resource);
    fs.writeGenerator('component', resourceName, {
        objectName: inflector.objectify(resourceName),
        silent: config().silent
    });
    fs.writeComponentTemplate(templateName,{silent: config().silent});
};
