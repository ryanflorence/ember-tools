var template = require('../util/template');
var inflector = require('../util/inflector');

module.exports = function(resource, program) {
  var fields = parseFields(program.args.slice(1));
  var resourceName = inflector.underscore(inflector.singularize(resource));
  return template.generate('model', resourceName, {
    fields: fields,
    objectName: inflector.objectify(resourceName)
  }, true);
};

function parseFields(fieldsString) {
  return fieldsString.map(function(pair, index, arr) {
    var split = pair.split(':');
    var isLast = index == arr.length - 1;
    return {
      name: split[0],
      type: split[1],
      comma: isLast ? '' : ','
    };
  });
}

