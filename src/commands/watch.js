var fork = require('child_process').fork;
var config = require('../util/config');

module.exports = function() {
  // I don't know why this builds twice but twice is better than never!
  fork(__dirname+'/../../node_modules/fsmonitor/bin/fsmonitor.js', [
   '-p', '-d', config().jsPath,
   '!tests/index.js', '!tests/tests.js',
   '!index.js', '!templates.js', '!application.js',
   __dirname+'/../../bin/ember', 'build'
  ]);
};

