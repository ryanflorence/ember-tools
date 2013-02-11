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

var write = exports.write = function(name, savePath, locals, force) {
  return fsp.exists(savePath).then(function(exists) {
    if (!force && exists) {
      message.fileExists(savePath);
      return exists;
    }
    return writeFile(name, savePath, locals);
  });
};

function writeFile(name, savePath, locals) {
  var template = read(name);
  var src = compile(template, locals);
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

function compile(template, locals) {
  return handlebars.compile(template)(locals);
}

