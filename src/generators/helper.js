var template = require('../util/template');
var inflector = require('../util/inflector');

module.exports = function(name) {
  var fileName = inflector.underscore(name);
  var helperName = inflector.camelize(name);
  return template.generate('helper', fileName, {
    helperName: helperName
  }, true);
};

