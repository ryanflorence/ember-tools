var config             = require('../util/config');
var fsmonitor          = require('fsmonitor');
var RelPathList        = require('pathspec').RelPathList;
var PATHS              = RelPathList.parse(
  [
    '*.js',
    '*.hbs',
    '!application.js',
    '!index.js',
    '!templates.js'
  ]
);
var exec               = require('child_process').exec;
var message            = require('../util/message');

function watch(){
  var jsPath = process.cwd() + '/' + config().jsPath;
  fsmonitor.watch(jsPath, PATHS, function(change){
    message.notify('Change detected: ' + change.toString());
    exec(__dirname + '/../../bin/ember build', function(err,stdout,stderr){
      process.stdout.write(stdout);
    });
  });
}

module.exports = watch;
