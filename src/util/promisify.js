var rsvp = require('rsvp-that-works');
var slice = [].slice;

module.exports = function(func) {
  return function() {
    var promise = new rsvp.Promise();
    var args = slice.call(arguments, 0);
    args.push(function(err) {
      if (err) {
        promise.reject(err);
      } else {
        if (arguments.length === 2) {
          promise.resolve(arguments[1]);
        } else {
          promise.resolve(slice.call(arguments, 1));
        }
      }
    });
    func.apply(null, args);
    return promise;
  };
};

