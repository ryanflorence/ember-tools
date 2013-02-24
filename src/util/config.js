var fs = require('fs');
var message = require('./message');

module.exports = function(program) {
  var program = program || {};
  if (fs.existsSync('.ember')) {
    var data = JSON.parse(fs.readFileSync('.ember'));
    console.log(data);
    if (program.args && program.args.length === 2) {
      var app = program.args[1];
      return data[app];
    } else {
      for (var key in data) {
        return data[key]
      }
    }
  } else {
    message.notify("ember: could not find .ember file, please run `ember create [appDir]`");
    process.exit();
    return 'shutup jslint';
  }
};
