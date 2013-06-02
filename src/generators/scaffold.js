var config = require('../util/config');
var inflector = require('../util/inflector');
var fs = require('../util/fs');
var msg = require('../util/message');

var root;

module.exports = function(resource, env) {
  if (!env.fields) {
    msg.error("You need to declare some fields, ie:\n   ember generate -s user name:string age:number");
  }
  root = config().jsPath;
  createModel(resource, env.fields);
  createControllers(resource);
  createRoutes(resource);
  createTemplates(resource, env.fields);
  addRoutes(resource);
};

function createModel(resource, fields) {
  var modelName = inflector.underscore(inflector.singularize(resource));
  fs.writeGenerator('model', modelName, {
    fields: fields,
    objectName: inflector.objectify(modelName)
  }, modelName);
}

function createControllers(resource) {
  var modelRoute = inflector.underscore(inflector.singularize(resource));
  var saveDir = root+'/controllers/';
  var underscored = inflector.underscore(resource);
  var objectName = inflector.objectify(resource)+'Controller';
  fs.writeTemplate(
    'scaffold',
    'controllers/edit_resource_controller.js', 
    {
      objectName: 'Edit' + objectName,
      modelRoute: modelRoute
    },
    saveDir+'edit_'+underscored+'_controller.js'
  );
  fs.writeTemplate(
    'scaffold',
    'controllers/new_resource_controller.js',
    {
      editObjectName: 'Edit' + objectName,
      editObjectPath: './edit_' + underscored + '_controller',
      objectName: 'New' + objectName
    },
    saveDir+'new_'+underscored+'_controller.js'
  );
  fs.writeTemplate(
    'scaffold',
    'controllers/resource_controller.js',
    {
      objectName: objectName,
      resourcesRoute: inflector.pluralize(modelRoute)
    },
    saveDir+underscored+'_controller.js'
  );
}

function createRoutes(resource) {
  var saveDir = root + '/routes/';
  var objectName = inflector.objectify(resource) + 'Route';
  var underscored = inflector.underscore(resource);
  var modelName = inflector.underscore(inflector.singularize(resource));
  fs.writeTemplate(
    'scaffold',
    'routes/new_resource_route.js',
    {
      modelName: modelName,
      modelPath: '../models/' + inflector.underscore(modelName),
      objectName: 'New' + objectName,
      editRoute: 'edit_' + modelName,
      controller: 'new_' + underscored
    },
    saveDir+'new_'+underscored+'_route.js'
  );
  fs.writeTemplate(
    'scaffold',
    'routes/resources_route.js',
    {
      modelName: inflector.objectify(modelName),
      modelPath: '../models/' + inflector.underscore(modelName),
      objectName: objectName
    },
    saveDir+inflector.pluralize(underscored)+'_route.js'
  );
}

function createTemplates(resource, fields) {
  if (fields) fields.forEach(function(field) {
    field.title = inflector.humanize(field.name);
    field.id = inflector.underscore(field.name);
  });

  var modelName = inflector.underscore(inflector.singularize(resource));
  var saveDir = root + '/templates/';
  fs.writeTemplate(
    'scaffold',
    'templates/edit_resource.hbs',
    {
      title: inflector.humanize(resource),
      fields: fields
    },
    saveDir+'edit_'+resource+'.hbs'
  );
  var title = inflector.humanize(resource);
  fs.writeTemplate(
    'scaffold',
    'templates/resource.hbs',
    {
      title: title,
      fields: fields,
      editRoute: 'edit_' + inflector.underscore(resource),
      resourcesRoute: inflector.pluralize(modelName),
      resources: inflector.pluralize(title)
    },
    saveDir+resource+'.hbs'
  );
  fs.writeTemplate(
    'scaffold',
    'templates/resources.hbs',
    {
      title: inflector.pluralize(inflector.humanize(resource)),
      modelTitle: inflector.humanize(modelName),
      newPath: 'new_' + inflector.underscore(resource),
      resource: modelName,
      fields: fields
    },
    saveDir+inflector.pluralize(resource)+'.hbs'
  );
}

function addRoutes(resource) {
  resource = inflector.underscore(resource);
  var routesPath = root+'/config/routes.js';
  var templatePath = __dirname+'/../templates/scaffold/config/routes.js.hbs';
  var fragment = fs.renderTemplate(templatePath, {
    resource: resource,
    resources: inflector.pluralize(resource)
  });
  var src = fs.readFileSync(routesPath).toString();
  // TODO: this is ghetto, be more intelligent
  src = src.replace(/(App\.Router\.map\(function\(\) \{)/, '$1\n\n' + fragment);
  fs.writeFileSync(routesPath, src, 'force');
}

