var generators = require('../generators/index');

module.exports = function(argsArray) {
  var env = argsArray.pop();
  parseOptions(env);
  if (argsArray.length) {
    env.fields = parseFields(argsArray);
  }
  return env;
};

function parseOptions(env) {
  var envGenerators = [];
  for (var generator in generators) {
    if (env[generator]) {
      envGenerators.push(generator);
      if ('string' == typeof env[generator]) {
        env.resourceName = env[generator];
      }
    }
  }
  envGenerators.forEach(function(generator) {
    env[generator] = env.resourceName;
  });
  return env;
}

function parseFields(fieldsString) {
  return fieldsString.map(function(pair, index, arr) {
    var split = pair.split(':');
    var isLast = index == arr.length - 1;
    return {
      name: split[0],
      type: split[1],
      // a little template <3 to add a comma or not
      comma: isLast ? '' : ','
    };
  });
}

