var handlebars = require('handlebars');
var fs = require('fs');
var inflector = require('./inflector');
var rsvp = require('rsvp-that-works');
var fsp = require('./fs-promised');
var message = require('./message');
var config = require('./config');

var read = exports.read = function(name) {
  var path = __dirname + '/../templates/' + name + '.handlebars';
  return fs.readFileSync(path).toString();
};

var write = exports.write = function(srcPath, savePath, locals, force) {
  return fsp.exists(savePath).then(function(exists) {
    if (!force && exists) {
      message.fileExists(savePath);
      return exists;
    }
    return writeFile(srcPath, savePath, locals);
  });
};

function writeFile(srcPath, savePath, locals) {
  var src = compile(srcPath, locals);
  return fsp.createFile(savePath).then(function() {
    return fsp.writeFile(savePath, src).then(function() {
      message.fileCreated(savePath);
    }, fsp.error);
  }, fsp.error);
}

var generate = exports.generate = function(type, resourceName, locals) {
  var root = config().appDir;
  var ext = type == 'template' ? '.handlebars' : '.js';
  name = 'generate/' + type + ext;
  path = root + '/' + inflector.pluralize(type) + '/' + resourceName + ext;
  return write(name, path, locals, true);
};

var compile = exports.compile = function(srcPath, locals) {
  var template = read(srcPath);
  var compiled = handlebars.compile(template);
  return compiled(locals);
};

