var glob = require('glob');
var config = require('../util/config');
var fs = require('../util/fs');
var childProcess = require('child_process');
var exec = childProcess.exec;
var fork = childProcess.fork;
var message = require('../util/message');

module.exports = function(env, cb) {
  var jsPath = config().jsPath;
  var tests = glob.sync(jsPath+'/tests/**/*.test.js');
  tests = tests.map(function(test) {
    return test.replace(jsPath+'/tests', '.').replace(/\.js$/, '');
  });
  fs.writeTemplate(
    'test',
    'index.js',
    {tests: tests},
    jsPath+'/tests/index.js',
    'force'
  );

  // mostly copy/pasta from build command ... but whatever (for now)
  var now = Date.now();
  var outFile = jsPath+'/tests/tests.js';
  var command = [
    'node', __dirname+'/../../node_modules/browserify/bin/cmd',
    '--noparse='+jsPath+'/vendor/ember.js',
    '--noparse='+jsPath+'/vendor/jquery.js',
    '--noparse='+jsPath+'/vendor/ember-data.js',
    '-d', '-e', jsPath+'/tests/index', '>', outFile
  ];
  exec(command.join(' '), function (error, stdout, stderr) {
    message.fileCreated(outFile);
    message.notify('tests build time: '+(Date.now() - now)+' ms');
    console.log(stdout, stderr);
    if (error) throw new Error(error);
    if (env.buildOnly) return cb && cb();
    fork(__dirname+'/../../node_modules/testem/testem.js', ['-f', jsPath+'/tests/support/testem.json']);
  });
};

