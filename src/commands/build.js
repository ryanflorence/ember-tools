var exec = require('child_process').exec;
var fs = require('fs');
var handlebars = require('handlebars');
var jsdom = require('jsdom');
var appDirs = require('../util/appDirs');
var template = require('../util/template');
var inflector = require('../util/inflector');
var walk = require('walk').walkSync;
var precompile = require('./precompile');
var root;

module.exports = function(program) {
  root = require('../util/config')().appDir;
  precompile(rootify('templates'), rootify('templates.js'), function() {
    createIndex().then(build);
  });
};

function createIndex() {
  var modules = [];
  appDirs.forEach(function(dirName) {
    if (dirName == 'templates') return;
    var dirPath = rootify(dirName);
    var walker = walk(dirPath);
    walker.on('file', function(dir, stats, next) {
      var path = unroot(dir + '/' + stats.name).replace(/\.js$/, '');
      var name = inflector.objectify(path.replace(dirName, ''));
      modules.push({
        objectName: name,
        path: path
      });
      next();
    });
  });

  return template.write(
    'build/index.js',
    rootify('index.js'),
    {modules: modules},
    true
  );
}

function build() {
  var command = __dirname + '/../../node_modules/browserbuild/bin/browserbuild ' +
                "-m index -b " + root + "/ `find "+ root + " -name '*.js'` > " +
                rootify('application.js');
  exec(command, function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error) throw new Error(error);
    cleanup();
  });
}

function cleanup() {
  //fs.unlink(rootify('index.js'));
  //fs.unlink(rootify('templates.js'));
}

function rootify(path) {
  return root + '/' + path;
}

function unroot(path) {
  return path.replace(root + '/', '');
}

