var fs = require('fs');
var message = require('./message');

module.exports = function() {
  if (fs.existsSync('.ember')) {
    return JSON.parse(fs.readFileSync('.ember'));
  } else {
    message.notify("ember: could not find .ember file, please run `ember create [appDir]`");
    return process.exit();
  }
};

