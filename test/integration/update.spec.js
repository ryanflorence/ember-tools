var helpers   = require('../support/helpers');
var generate  = helpers.generate;
var exec      = require('child_process').exec;
var fs        = require('fs');
var rm        = require('rimraf');
var request   = require('request');
var EMBER_BIN = __dirname + '/../../bin/ember';
var PWD       = process.cwd();

function update(opts,done){
  exec('(cd test_app && ' + EMBER_BIN + ' update ' + opts + ')', function(err){
    if (err) throw err;
    done();
  });
}

function download(filename,callback){
  return request.get('http://builds.emberjs.com/' + filename + '.js', callback);
}

describe('ember update', function(){
  this.timeout(10000);

  before(function(done){
    exec('./bin/ember create test_app', function(err){
      if (err) return done(err);
      done();
    });
  });

  after(function(done){
    rm('test_app', done);
  });

  it('can update to the latest stable from s3', function(done){
    update('stable', function(){
      download('ember-latest-stable',function(err,response,data){
        if (err) return done(err);
        var file = fs.readFileSync(PWD + '/test_app/js/vendor/ember.js', 'utf8');
        file.should.equal(data);
        done();
      });
    });
  });

  it('can update to the latest build from s3', function(done){
    update('latest', function(){
      download('ember-latest',function(err,response,data){
        if (err) return done(err);
        var file = fs.readFileSync(PWD + '/test_app/js/vendor/ember.js', 'utf8');
        file.should.equal(data);
        done();
      });
    });
  });

});
