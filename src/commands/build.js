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
var fsmonitor          = require('fsmonitor');
var RelPathList        = require('pathspec').RelPathList;
var color = require('cli-color');
var path = require('path');

module.exports = function(env) {
  env.watch ? watchBuild(env) : singleBuild(env);
};

function singleBuild(env){
  precompileTemplates(function() {
    createIndex(function() {
      build(env, function() {
        if (env.cleanup) cleanup();
      });
    });
  });
}

var PATHS = RelPathList.parse(
  [
    '*.js',
    '*.hbs',
    '!application.js',
    '!index.js',
    '!templates.js'
  ]
);

function watchBuild(env){
  singleBuild(env);
  message.notify('Watching build...');
  var jsPath = process.cwd() + '/' + config().jsPath;
  fsmonitor.watch(jsPath, PATHS, function(change){
    message.notify('Change detected: ' + change.toString().trim());
    singleBuild(env);
  });
}

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
  var outDir = path.dirname(outFile);
  var command = [
    'node', __dirname + '/../../node_modules/browserify/bin/cmd',
    '--noparse='+root+'/vendor/ember.js',
    '--noparse='+root+'/vendor/jquery.js',
    '--noparse='+root+'/vendor/ember-data.js',
    '--noparse='+root+'/templates.js',
    '-e', root+'/index', '>', outFile
  ];
  if (!fs.existsSync(outDir)) fs.mkdirpSync(outDir);
  if (env.debug) command.splice(2, 0, '-d');
  exec(command.join(' '), function (error, stdout, stderr) {
    message.fileCreated(outFile);
    message.notify('Build time: '+(Date.now() - now)+' ms');
    if(stdout) console.log(stdout.trim());
    if(stderr) console.log(color.red(stderr.trim()));
    if (error && !env.watch) throw new Error(error);
    cb();
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

