var walk = require('walk').walk;
var fs = require('fs');
var jsdom = require('jsdom');
var template = require('../util/template');

module.exports = function(source, savePath, callback) {
  callback = callback || function(){};
  getTemplates(source, function(templates) {
    precompile(templates, function(src) {
      template.write('precompile/templates.js', savePath, {
        templates: templates
      }, true).then(function() {
        callback();
      }, function(err) {
        console.log(err);
      });
    });
  });
};

function precompile(templates, callback) {
  jsdom.env(
    '<p>dumb I need a dom</p>',
    [
      __dirname + "/../../packages/jquery.js",
      __dirname + "/../../packages/handlebars.js",
      __dirname + "/../../packages/ember.js"
    ],
    function(errors, window) {
      templates.forEach(function(template) {
        var fn = window.Ember.Handlebars.precompile(template.content);
        template.src = fn.toString();
      });
      callback(templates);
    }
  );
}

function getTemplates(source, callback) {
  var templates = [];
  var walker = walk(source);

  walker.on('file', function(dir, stats, next) {
    var path = dir + '/' + stats.name;
    var name = path.replace(/\.handlebars$/, '').replace(source + '/', '');
    templates.push({
      name: name,
      content: fs.readFileSync(path).toString()
    });
    next();
  });

  walker.on('end', function() {
    callback(templates);
  });
}


