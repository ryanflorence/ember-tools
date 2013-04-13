// Being a bit lazy with these pending tests.
// The build tests indirectly test the generators but it's
// desirable to test the generoators directly

var exec = require("child_process").exec;
var fs = require("fs");
var rm = require("rimraf");
var helpers = require("../support/helpers");

function createTestApp(done) {
  exec("./bin/ember create -d test-app", function() {
    fs.exists('.ember', function(exists) {
      exists.should.equal(true);
      done();
    });
  });  
}
function removeTestApp(done) {
  rm("./test-app", function() {
    fs.unlink('.ember', done);
  });
}

function call(opts, done) {
  exec("./bin/ember generate " + opts, function(err) {
    if (err) throw new Error(err);
    done();
  });
}

describe("model", function() {

  beforeEach(createTestApp);

  afterEach(removeTestApp);

  it("should generate models", function(done) {
    call("-m list", function() {
      helpers.assertPathsExist(['test-app/models/list.js'], done);
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

  it("should generate a file named 'tacoable' in folder 'mixins'", function(done) {
    call("-x tacoable", function() {
      helpers.assertPathsExist(["test-app/mixins/tacoable.js"], done);
    });
  });
});

