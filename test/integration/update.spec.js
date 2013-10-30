var helpers   = require('../support/helpers');
var generate  = helpers.generate;
var exec      = require('child_process').exec;
var fs        = require('fs');
var rm        = require('rimraf');
var request   = require('request');
var EMBER_BIN = __dirname + '/../../bin/ember';
var CWD       = process.cwd();

function update(opts,done){
  exec('(cd test-app && ' + EMBER_BIN + ' update ' + opts + ')', function(err){
    if (err) throw err;
    done();
  });
}

function download(path,callback){
  return request.get('http://builds.emberjs.com/' + path + '/ember.js', callback);
}

describe('ember update', function(){
  this.timeout(10000);

  before(function(done){
    exec('./bin/ember create test-app', function(err){
      if (err) return done(err);
      done();
    });
  });

  after(function(done){
    rm('test-app', done);
  });

  it('can update to the latest stable from s3', function(done){
    update('release', function(){
      download('release',function(err,response,data){
        if (err) return done(err);
        var file = fs.readFileSync(CWD + '/test-app/js/vendor/ember.js', 'utf8');
        file.should.equal(data);
        done();
      });
    });
  });

  it('can update to the latest beta build from s3', function(done){
    update('beta', function(){
      download('beta',function(err,response,data){
        if (err) return done(err);
        var file = fs.readFileSync(CWD + '/test-app/js/vendor/ember.js', 'utf8');
        file.should.equal(data);
        done();
      });
    });
  });

  it('can update to the latest canary build from s3', function(done){
    update('canary', function(){
      download('canary',function(err,response,data){
        if (err) return done(err);
        var file = fs.readFileSync(CWD + '/test-app/js/vendor/ember.js', 'utf8');
        file.should.equal(data);
        done();
      });
    });
  });

});
