var util = require('util'),
    connect = require('connect'),
    port = 3000;

module.exports = function() {
    connect.createServer(connect.static(process.cwd())).listen(port);
    util.puts('Listening on ' + port + '...');
    util.puts('Press Ctrl + C to stop.');    
}
