var fs = require('../util/fs');
var inflector = require('../util/inflector');

module.exports = function(name) {
  var fileName = inflector.underscore(name);
  var helperName = inflector.camelize(name);
  fs.writeGenerator('helper', fileName, {
    helperName: helperName
  });
};

