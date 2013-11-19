var prompt = require('sync-prompt').prompt;
var color = require('cli-color');

var green = color.green;
var yellow = color.yellow;
var blue = color.blue;
var red = color.red;

exports.assert = function(message, test) {
  if (test) return;
  throw new Error(message);
};

exports.error = function(message, test) {
  if (test) return;
  console.log(red('-> ')+message);
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

exports.confirm = function(question) {
  var userInput = exports.prompt(question+' (y/n)');
  return userInput == 'y' || userInput == 'yes';
};

exports.prompt = function(question) {
  process.stdout.write(yellow('-> ')+question+': ');
  return prompt().toLowerCase();
};

exports.silentMode = function() {
    console.log(yellow("   WARNING:\t") + "Silent mode is enabled\n");
};
