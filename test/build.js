var exec = require("child_process").exec;
var fs = require("fs");
var rm = require("rimraf");
var helpers = require("./support/helpers");

function create(done) {
  exec("./bin/ember create test-app", function(err) {
    if (err) throw new Error(err);
    fs.exists('.ember', function(exists) {
      exists.should.equal(true);
      done();
    });
  });
}

function createAnother(done) {
  exec("./bin/ember create another-test-app", function(err) {
    if (err) throw new Error(err);
    fs.writeFile('.ember', '{\n  "test-app": {\n    "modules": "cjs",\n    "appDir": "test-app"\n  },\n  "another-test-app": {\n    "modules": "cjs",\n    "appDir": "another-test-app"\n  }\n}', function(err) {
      if (err) throw new Error(err);
      done();
    });
  });
}

function cleanup(done) {
  rm("./test-app", function() {
    fs.unlink('.ember', done);
  });
}

function cleanupAnother(done) {
  rm("./another-test-app", function() {
    fs.writeFile('.ember', '{\n  "modules": "cjs",\n   "appDir": "test-app"\n}', function(err) {
      if (err) throw new Error(err)
      done();
    });
  });
}

function build(done) {
  exec("./bin/ember build", function(err) {
    if (err) throw new Error(err);
    done();
  });
}

function assertFilesMatch(a, b) {
  b = b || a;
  var actual = fs.readFileSync(__dirname + '/../test-app/' + a).toString();
  var expected = fs.readFileSync(__dirname + '/support/build/' + b).toString();
  actual.should.equal(expected);
}

describe("build", function() {

  beforeEach(create);

  afterEach(cleanup);

  describe("templates.js", function() {
    it("should look like this", function(done) {
      build(function() {
        assertFilesMatch('templates.js');
        done();
      });
    });
  });

  describe("index.js", function() {
    it("should look like this", function(done) {
      build(function() {
        assertFilesMatch('index.js');
        done();
      });
    });

    it("should assign application modules to the application namespace", function(done) {
      helpers.generate('-mvcr cow', function() {
        build(function() {
          assertFilesMatch('index.js', 'modules.js');
          done();
        });
      });
    });

    it("should convert sub-directory module paths to object names correctly", function(done) {
      helpers.generate('-vcr cows/new', function() {
        build(function() {
          assertFilesMatch('index.js', 'sub_directories.js');
          done();
        });
      });
    });
  });

  describe("targets specific project by key in .ember config file", function() {

    before(createAnother);

    after(cleanupAnother);

    it("should build the correct app", function(done) {
      exec("./bin/ember build another-test-app", function(err) {
        if (err) throw new Error(err);
        fs.exists("./another-test-app/application.js", function(exists) {
          exists.should.equal(true);
          done();
        });
      });
    });

  });
});

