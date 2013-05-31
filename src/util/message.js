var prompt = require('sync-prompt').prompt;
var color = require('cli-color');

var green = color.green;
var yellow = color.yellow;
var blue = color.blue;

exports.assert = function(message, test) {
  if (test) return;
  throw new Error(message);
};

exports.error = function(message, test) {
  if (test) return;
  console.log('ember: ' + message);
  process.exit();
};

exports.notify = function(message) {
  console.log(message);
};

exports.fileCreated = function(path) {
  console.log(green("   created:\t") + path);
};

exports.fileSkipped= function(path) {
  console.log(yellow("   skipped:\t") + path);
};

exports.fileExists = function(path) {
  console.log(yellow("   exists:\t") + path);
};

exports.confirm = function(message) {
  process.stdout.write(yellow('-> ')+message+' (y/n): ');
  var userInput = prompt().toLowerCase();
  return userInput == 'y' || userInput == 'yes';
};

