module.exports = function(str, fn){
  process.stdout.write(str);
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', function(input){
    fn(input.trim());
  }).resume();
};

