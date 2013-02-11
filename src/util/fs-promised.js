var fs = require('fs');
var rsvp = require('rsvp-that-works');
var fse = require('fs-extra');
var promisify = require('./promisify');
var message = require('./message');

var methods = [
  'readFile',
  'writeFile',
  'mkdir',
  'readdir'
];

methods.forEach(function(method) {
  exports[method] = promisify(fs[method]);
});

exports.createFile = promisify(fse.createFile);

exports.exists = function(path) {
  var promise = new rsvp.Promise();
  fs.exists(path, function(exists) {
    promise.resolve(exists);
  });
  return promise;
};

exports.writeFileUnlessExists = function(path, data) {
  return fs.exists(path).then(function(exists) {
    if (exists) {
      message.fileExists(path);
      return exists;
    } else {
      message.fileCreated(path);
      return fs.writeFile(path, data);
    }
  });
};

exports.error = function(err) {
  throw new Error(err);
};

