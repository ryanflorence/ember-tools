var exec = require("child_process").exec;
var fs = require("fs");
var rm = require("rimraf");
var helpers = require("../support/helpers");

describe("create directory", function() {

  afterEach(function(done) {
    rm("./test-app", done);
  });

  it("should add a bunch of files and directories", function(done) {
    exec("./bin/ember create test-app", function() {
      helpers.assertPathsExist([
        "test-app/ember.json",
        "test-app/index.html",
        "test-app/js/config",
        "test-app/js/controllers",
        "test-app/js/models",
        "test-app/js/routes",
        "test-app/js/templates",
        "test-app/js/views",
        "test-app/js/vendor",
        "test-app/js/config/app.js",
        "test-app/js/config/store.js",
        "test-app/js/config/routes.js",
        "test-app/js/templates/application.hbs",
        "test-app/js/templates/index.hbs",
        "test-app/js/vendor/ember-data.js",
        "test-app/js/vendor/ember.js",
        "test-app/js/vendor/handlebars.js",
        "test-app/js/vendor/jquery.js",
        "test-app/js/vendor/localstorage_adapter.js"
      ], done);
    });
  });
});

describe("create in cwd", function() {
  afterEach(function(done) {
    rm("./test-app", done);
  });

  it("scaffolds in the CWD if no directory passed", function(done){
    exec("mkdir test-app && cd test-app && ../bin/ember create", function() {
      helpers.assertPathsExist([
        "test-app/ember.json",
        "test-app/index.html",
        "test-app/js/config",
        "test-app/js/controllers",
        "test-app/js/models",
        "test-app/js/routes",
        "test-app/js/templates",
        "test-app/js/views",
        "test-app/js/vendor",
        "test-app/js/config/app.js",
        "test-app/js/config/store.js",
        "test-app/js/config/routes.js",
        "test-app/js/templates/application.hbs",
        "test-app/js/templates/index.hbs",
        "test-app/js/vendor/ember-data.js",
        "test-app/js/vendor/ember.js",
        "test-app/js/vendor/handlebars.js",
        "test-app/js/vendor/jquery.js",
        "test-app/js/vendor/localstorage_adapter.js"
      ], done);
    });
  });
});

