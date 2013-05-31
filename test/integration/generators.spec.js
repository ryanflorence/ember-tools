// Being a bit lazy with these pending tests.
// The build tests indirectly test the generators but it's
// desirable to test the generoators directly

var exec = require("child_process").exec;
var fs = require("fs");
var helpers = require("../support/helpers");

function createTestApp(done) {
  exec("./bin/ember create test-app", done);
}

function removeTestApp(done) {
  exec("rm -rf ./test-app", done);
}

function generate(opts, done) {
  process.chdir('test-app');
  exec("../bin/ember generate "+opts, function(err) {
    if (err) throw new Error(err);
    process.chdir('..');
    done();
  });
}

describe("model", function() {

  beforeEach(createTestApp);

  afterEach(removeTestApp);

  it("should generate models", function(done) {
    generate("-m list", function() {
      helpers.assertPathsExist(['test-app/js/models/list.js'], done);
    });
  });

  it('should use singular name of resource name provided');
});

describe("view", function() {
  it("should use full resource name but save to sub directory");
});

describe("controller", function() {
  it("should use full resource name but save to sub directory");
});

describe("route", function() {
  it("should use full resource name but save to sub directory");
});

describe("template", function() {
  it("should save to sub directory");
});

describe("mixin", function() {

  beforeEach(createTestApp);

  afterEach(removeTestApp);

  // haven't figured out testing user input from the cli yet, pending
  // test for now

  //it("should generate mixins", function(done) {
    //generate("-x tacoable", function() {
      //helpers.assertPathsExist(["test-app/js/mixins/tacoable.js"], done);
    //});
  //});
});

