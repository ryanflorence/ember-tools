var template = require('../util/template');
var inflector = require('../util/inflector');
var rsvp = require('rsvp-that-works');
var fs = require('fs');
var fsp = require('../util/fs-promised');
var message = require('../util/message');
var config, root;
var inf = inflector;

module.exports = function(resource, env) {
  config = require('../util/config')();
  root = config.appDir;
  return rsvp.all(
    createModel(resource, env.fields),
    createControllers(resource),
    createRoutes(resource),
    createTemplates(resource, env.fields),
    addRoutes(resource)
  );
};

function createModel(resource, fields) {
  var modelName = inflector.underscore(inflector.singularize(resource));
  return template.generate('model', modelName, {
    fields: fields,
    objectName: inflector.objectify(modelName)
  }, true);
}

function createControllers(resource) {
  var modelRoute = inflector.underscore(inflector.singularize(resource));
  var saveDir = root + '/controllers/';
  var underscored = inflector.underscore(resource);
  var objectName = inflector.objectify(resource) + 'Controller';
  var editController = template.write(
    'scaffold/controllers/edit_resource_controller.js',
    saveDir + 'edit_' + underscored + '_controller.js',
    {
      objectName: 'Edit' + objectName,
      modelRoute: modelRoute
    },
    true
  );
  var newController = template.write(
    'scaffold/controllers/new_resource_controller.js',
    saveDir + 'new_' + underscored + '_controller.js',
    {
      editObjectName: 'Edit' + objectName,
      editObjectPath: './edit_' + underscored + '_controller',
      objectName: 'New' + objectName
    },
    true
  );
  var resourceController = template.write(
    'scaffold/controllers/resource_controller.js',
    saveDir + underscored + '_controller.js',
    {
      objectName: objectName,
      resourcesRoute: inflector.pluralize(modelRoute)
    },
    true
  );
  return rsvp.all(editController, newController, resourceController);
}

function createRoutes(resource) {
  var saveDir = root + '/routes/';
  var objectName = inflector.objectify(resource) + 'Route';
  var underscored = inflector.underscore(resource);
  var modelName = inflector.underscore(inflector.singularize(resource));
  var newRoute = template.write(
    'scaffold/routes/new_resource_route.js',
    saveDir + 'new_' + underscored + '_route.js',
    {
      modelName: modelName,
      modelPath: '../models/' + inflector.underscore(modelName),
      objectName: 'New' + objectName,
      editRoute: 'edit_' + modelName,
      controller: 'new_' + underscored
    },
    true
  );
  var resourcesRoute = template.write(
    'scaffold/routes/resources_route.js',
    saveDir + inflector.pluralize(underscored) + '_route.js',
    {
      modelName: inflector.objectify(modelName),
      modelPath: '../models/' + inflector.underscore(modelName),
      objectName: objectName
    },
    true
  );
  return rsvp.all(newRoute, resourcesRoute);
}

function createTemplates(resource, fields) {
  fields.forEach(function(field) {
    field.title = inflector.humanize(field.name);
    field.id = inflector.underscore(field.name);
  });

  var modelName = inflector.underscore(inflector.singularize(resource));
  var saveDir = root + '/templates/';
  var edit = template.write(
    'scaffold/templates/edit_resource.handlebars',
    saveDir + 'edit_' + resource + '.handlebars',
    {
      title: inflector.humanize(resource),
      fields: fields
    },
    true
  );
  var title = inflector.humanize(resource);
  var resourceTemplate = template.write(
    'scaffold/templates/resource.handlebars',
    saveDir + resource + '.handlebars',
    {
      title: title,
      fields: fields,
      editRoute: 'edit_' + inflector.underscore(resource),
      resourcesRoute: inflector.pluralize(modelName),
      resources: inflector.pluralize(title)
    },
    true
  );
  var resources = template.write(
    'scaffold/templates/resources.handlebars',
    saveDir + inflector.pluralize(resource) + '.handlebars',
    {
      title: inflector.pluralize(inflector.humanize(resource)),
      modelTitle: inflector.humanize(modelName),
      newPath: 'new_' + inflector.underscore(resource),
      resource: modelName,
      fields: fields
    },
    true
  );
  return rsvp.all(edit, resourceTemplate, resources);
}

function addRoutes(resource) {
  resource = inflector.underscore(resource);
  var routesPath = root + '/config/routes.js';
  var fragment = template.compile('scaffold/config/routes.js', {
    resource: resource,
    resources: inflector.pluralize(resource)
  });
  var src = fs.readFileSync(routesPath).toString();
  // TODO: this is ghetto, be more intelligent
  src = src.replace(/(App\.Router\.map\(function\(\) \{)/, '$1\n\n' + fragment);
  return fsp.writeFile(routesPath, src).then(function() {
    message.fileCreated(routesPath);
  }, fsp.error);
}

function parseFields(fieldsString) {
  return fieldsString.map(function(pair, index, arr) {
    var split = pair.split(':');
    var isLast = index == arr.length - 1;
    return {
      name: split[0],
      type: split[1],
      comma: isLast ? '' : ','
    };
  });
}

