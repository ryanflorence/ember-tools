var exec = require("child_process").exec;
var fs = require("fs");
var rm = require("rimraf");
var helpers = require("../support/helpers");

describe("create directory", function() {

  afterEach(function(done) {
    rm("./test-app", function() {
      fs.unlink('.ember', done);
    });
  });

  it("should add a bunch of files and directories", function(done) {
    exec("./bin/ember create -d test-app", function() {
      helpers.assertPathsExist([
        ".ember",
        "test-app/config",
        "test-app/controllers",
        "test-app/models",
        "test-app/routes",
        "test-app/templates",
        "test-app/views",
        "test-app/vendor",
        "test-app/index.html",
        "test-app/app.js",
        "test-app/config/store.js",
        "test-app/config/routes.js",
        "test-app/templates/application.handlebars",
        "test-app/templates/index.handlebars",
        "test-app/vendor/ember-data.js",
        "test-app/vendor/ember.js",
        "test-app/vendor/handlebars.js",
        "test-app/vendor/jquery.js",
        "test-app/vendor/localstorage_adapter.js"
      ], done);
    });
  });
});

describe("create in cwd", function() {
  afterEach(function(done) {
    rm("./test-app", done);
  });

  it("scaffolds in the CWD if no directory passed", function(done){
    exec("mkdir test-app && cd test-app && ../bin/ember create -d", function() {
      helpers.assertPathsExist([
        "test-app/.ember",
        "test-app/config",
        "test-app/controllers",
        "test-app/models",
        "test-app/routes",
        "test-app/templates",
        "test-app/views",
        "test-app/vendor",
        "test-app/index.html",
        "test-app/app.js",
        "test-app/config/store.js",
        "test-app/config/routes.js",
        "test-app/templates/application.handlebars",
        "test-app/templates/index.handlebars",
        "test-app/vendor/ember-data.js",
        "test-app/vendor/ember.js",
        "test-app/vendor/handlebars.js",
        "test-app/vendor/jquery.js",
        "test-app/vendor/localstorage_adapter.js"
      ], done);
    });
  });
});

