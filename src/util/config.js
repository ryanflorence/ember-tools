var fs = require('fs');
var message = require('./message');
var config;

module.exports = function() {
  if (config) { return config; }
  if (fs.existsSync('ember.json')) {
    var config = JSON.parse(fs.readFileSync('ember.json'));
    return config;
  } else {
    message.notify("ember: could not find ember.json file at, please run `ember create [appDir]`");
    return process.exit();
  }
};

