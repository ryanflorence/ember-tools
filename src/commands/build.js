var exec = require('child_process').exec;
var fs = require('../util/fs');
var handlebars = require('handlebars');
var appDirs = require('../util/appDirs');
var template = require('../util/template');
var message = require('../util/message');
var inflector = require('../util/inflector');
var walk = require('walk').walkSync;
var precompile = require('../util/precompile');
var config = require('../util/config');

module.exports = function(program) {
  precompileTemplates(function() {
    createIndex();
    build();
  });
};

function precompileTemplates(cb) {
  precompile(getAssetPath('templates'), getAssetPath('templates.js'), cb);
}

function createIndex() {
  var modules = [];
  var helpers = [];
  appDirs.forEach(function(dirName) {
    if (dirName == 'templates' || dirName == 'config') return;
    var dirPath = getAssetPath(dirName);
    var walker = walk(dirPath);
    walker.on('file', function(dir, stats, next) {
      if (stats.name.charAt(0) !== '.') {
        var path = unroot(dir+'/'+stats.name).replace(/\.js$/, '');
        if (dirName == 'helpers') {
          helpers.push({path: path});
        } else {
          var name = inflector.objectify(path.replace(dirName, ''));
          modules.push({
            objectName: name,
            path: path
          });
        }
      }
      next();
    });
  });

  var locals = {modules: modules, helpers: helpers};
  fs.writeTemplate('build', 'index.js', locals, getAssetPath('index.js'), 'force');
}

function build() {
  var root = config().jsPath;
  var command = __dirname + '/../../node_modules/browserbuild/bin/browserbuild ' +
                "-m index -g App -b " + root + "/ `find "+ root + " -name '*.js'` > " +
                getAssetPath('application.js');
  exec(command, function (error, stdout, stderr) {
    message.fileCreated(getAssetPath('application.js'));
    console.log(stdout, stderr);
    if (error) throw new Error(error);
    cleanup();
  });
}

function cleanup() {
  fs.unlink(getAssetPath('index.js'));
  fs.unlink(getAssetPath('templates.js'));
}

function getAssetPath(path) {
  return config().jsPath+'/'+path;
}

function unroot(path) {
  return path.replace(config().jsPath+'/', '');
}

