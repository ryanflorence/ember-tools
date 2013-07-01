var exec = require('child_process').exec;
var fs = require('../util/fs');
var glob = require('glob');
var handlebars = require('handlebars');
var appDirs = require('../util/appDirs');
var message = require('../util/message');
var inflector = require('../util/inflector');
var walk = require('walk').walkSync;
var precompile = require('../util/precompile');
var config = require('../util/config');
var buildTest = require('./test');

module.exports = function(env) {
  precompileTemplates(function() {
    createIndex(function() {
      build(env, function() {
        if (env.cleanup) cleanup();
      });
    });
  });
};

function precompileTemplates(cb) {
  precompile(getAssetPath('templates'), getAssetPath('templates.js'), cb);
}

function createIndex(cb) {
  var modules = [];
  var helpers = [];
  appDirs.forEach(function(dirName, index, array) {
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
    walker.on('end', function() {
      if (index != array.length - 1) return;
      var locals = {modules: modules, helpers: helpers};
      fs.writeTemplate('build', 'index.js', locals, getAssetPath('index.js'), 'force');
      cb();
    });
  });
}

function build(env, cb) {
  var now = Date.now();
  var root = config().jsPath;
  var outFile = (env.outFile || getAssetPath('application.js'));
  var command = [
    'node', __dirname + '/../../node_modules/browserify/bin/cmd',
    '--noparse='+root+'/vendor/ember.js',
    '--noparse='+root+'/vendor/jquery.js',
    '--noparse='+root+'/vendor/ember-data.js',
    '--noparse='+root+'/templates.js',
    '-e', root+'/index', '>', outFile
  ];
  if (env.debug) command.splice(2, 0, '-d');
  exec(command.join(' '), function (error, stdout, stderr) {
    message.fileCreated(outFile);
    message.notify('build time: '+(Date.now() - now)+' ms');
    console.log(stdout, stderr);
    if (error) throw new Error(error);
    env.buildOnly = true;
    buildTest(env, cb);
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

