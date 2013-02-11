var fleck = require('fleck');

for (method in fleck) exports[method] = fleck[method];

/*
 * CapitalizedCamelCase
 */

exports.classify = function(str) {
  return fleck.camelize(str, true);
};

/*
 * users/update_avatar -> UsersUpdateAvatar
 */

exports.objectify /*lol*/ = function (str) { 
  str = str.replace(/\//g, '_');
  return exports.classify(str);
};

