var fs = require('fs-extra');
var handlebars = require('handlebars');
var msg = require('./message');
var inflector = require('./inflector');
var config = require('./config');

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
fs.writeFileSync = function(fileName, data, force) {
  if (force != 'force' && fs.existsSync(fileName)) {
    if (!msg.confirm(fileName+' exists, overwrite?')) {
      return msg.fileSkipped(fileName);
    }
  }
  fs.createFileSync(fileName);
  writeFileSync(fileName, data);
  return msg.fileCreated(fileName);
};

fs.writeTemplate = function(command, templateName, locals, savePath, force) {
  var templatePath = __dirname+'/../templates/'+command+'/'+templateName+'.hbs';
  var src = fs.renderTemplate(templatePath, locals);
  savePath = savePath || config().jsPath+'/'+command+'/'+templateName;
  fs.writeFileSync(savePath, src, force);
};

fs.writeGenerator = function(generatorType, resourceName, locals) {
  var ext = (generatorType == 'template') ? '.hbs' : '.js';
  var pluralType = inflector.pluralize(generatorType);
  var savePath = config().jsPath+'/'+pluralType+'/'+resourceName+ext;
  fs.writeTemplate('generate', generatorType+ext, locals, savePath,locals.force?'force':'');
};

fs.writeComponentTemplate = function(resourceName, locals) {
  templateName = resourceName+'.hbs';
  var savePath = config().jsPath+'/templates/'+templateName;
  var templatePath = __dirname+'/../templates/generate/component_template.hbs.hbs';
  var src = fs.renderTemplate(templatePath, locals);
  fs.writeFileSync(savePath, src, locals.force?'force':'');
};

fs.renderTemplate = function(templatePath, locals) {
  var template = fs.readFileSync(templatePath).toString();
  var compiled = handlebars.compile(template);
  return compiled(locals);
};

