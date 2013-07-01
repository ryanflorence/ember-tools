// in other commands we use the configuration file, but since its created in
// this file, we don't.

var fs = require('../util/fs');
var msg = require('../util/message');
var appDirs = require('../util/appDirs');

var create = module.exports = function(appPath, env) {
  var paths = create.getPaths.apply(null, arguments);
  if (!paths) msg.error("Hmm, I didn't like that. See 'ember create --help'.");
  mkdirs(paths);
  writeConfigFile(paths);
  writeFiles(paths);
  copyVendor(paths);
  msg.notify("All done! Start with `config/routes.js` to add routes to your app.");
};

create.getPaths = function(appPath, env) {
  if (arguments.length > 2) return false;
  if (arguments.length == 1) {
    env = appPath;
    appPath = '.';
  }
  var jsRelative = env.jsPath || 'js';
  var jsPath = appPath+'/'+jsRelative;
  return {
    app: appPath,
    js: jsPath,
    jsRelative: jsRelative
  };
};

function mkdirs(paths) {
  fs.mkdirpSync(paths.app);
  fs.mkdirpSync(paths.js);
  fs.mkdirpSync(paths.js+'/vendor');
  appDirs.forEach(function(dir) {
    fs.mkdirpSync(paths.js+'/'+dir);
  });
  fs.mkdirpSync(paths.js+'/tests');
  fs.mkdirpSync(paths.js+'/tests/support');
  fs.mkdirpSync(paths.js+'/tests/unit');
  fs.mkdirpSync(paths.js+'/tests/integration');
}

function writeConfigFile(paths) {
  var locals = { modules: 'cjs', jsPath: paths.jsRelative };
  fs.writeTemplate('create', 'ember.json', locals, paths.app+'/ember.json');
}

function writeFiles(paths) {
  [
    'config/app.js',
    'config/store.js',
    'config/routes.js',
    'templates/application.hbs',
    'templates/index.hbs'
  ].forEach(function(file) {
    var savePath = paths.js+'/'+file;
    fs.writeTemplate('create', file, {}, savePath);
  });
  var locals = {jsPath: paths.js};
  fs.writeTemplate('create', 'index.html', locals, paths.app+'/index.html');
  fs.writeTemplate('create', 'tests/support/vendor.js', {}, paths.js+'/tests/support/vendor.js');
  fs.writeTemplate('create', 'tests/support/helpers.js', {}, paths.js+'/tests/support/helpers.js');
  fs.writeTemplate(
    'create', 'tests/support/testem.json',
    {jsPath: paths.jsRelative},
    paths.js+'/tests/support/testem.json'
  );
}

function copyVendor(paths) {
  var src = __dirname+'/../../packages';
  var dest = paths.js+'/vendor';
  fs.readdirSync(src).forEach(function(filePath) {
    var file = fs.readFileSync(src+'/'+filePath).toString();
    fs.writeFileSync(dest+'/'+filePath, file);
  });
}

