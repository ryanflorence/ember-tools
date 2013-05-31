var fs = require('fs-extra');
var msg = require('./message');
var handlebars = require('handlebars');
var config = require('./config');
var conf;

module.exports = fs;

var mkdirpSync = fs.mkdirpSync;
fs.mkdirpSync = function(path) {
  var result = mkdirpSync(path);
  if (result) {
    msg.fileCreated(path);
  } else {
    msg.fileSkipped(path);
  }
};

var writeFileSync = fs.writeFileSync;
fs.writeFileSync = function(fileName, data) {
  if (fs.existsSync(fileName)) {
    if (!msg.confirm(fileName+' exists, overwrite?')) {
      return msg.fileSkipped(fileName);
    }
  }
  writeFileSync(fileName, data);
  return msg.fileCreated(fileName);
};

fs.writeTemplate = function(command, templateName, locals, savePath) {
  locals = locals || {};
  savePath = savePath || getSavePath(command, templateName);
  var templatePath = __dirname+'/../templates/'+command+'/'+templateName+'.hbs';
  var template = fs.readFileSync(templatePath).toString();
  var compiled = handlebars.compile(template);
  var file = compiled(locals);
  savePath = savePath || getSavePath(command, templateName);
  fs.writeFileSync(savePath, file);
};

function getSavePath(command, templateName) {
  conf = conf || config();
  return conf.jsPath+'/'+command+'/'+templateName;
}

