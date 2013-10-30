var message = require('../util/message');
var precompile = require('../util/precompile');

module.exports = function(program) {
  if (!program.directory || !program.file) {
    message.notify('please provide a --directory and --file');
  } else {
    precompile(program.directory, program.file);
  }
};

