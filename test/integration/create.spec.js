var exec = require("child_process").exec;
var fs = require("fs");
var rm = require("rimraf");
var helpers = require("../support/helpers");

describe("create", function() {

  afterEach(function(done) {
    rm("./test-app", function() {
      fs.unlink('.ember', done);
    });
  });

  it("should add a bunch of files and directories", function(done) {
    exec("./bin/ember create test-app", function() {
      helpers.assertPathsExist([
        ".ember",
        "test-app/controllers",
        "test-app/models",
        "test-app/routes",
        "test-app/templates",
        "test-app/views",
        "test-app/vendor",
        "test-app/index.html",
        "test-app/App.js", 
        "test-app/Store.js", 
        "test-app/routes.js",
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

