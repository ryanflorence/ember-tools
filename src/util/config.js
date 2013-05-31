var fs = require('fs');
var message = require('./message');

module.exports = function() {
  if (fs.existsSync('ember.json')) {
    return JSON.parse(fs.readFileSync('ember.json'));
  } else {
    message.notify("ember: could not find ember.json file at, please run `ember create [appDir]`");
    return process.exit();
  }
};

