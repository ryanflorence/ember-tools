var fs            = require('fs');
var request       = require('request');
var DOWNLOAD_ROOT = 'http://builds.emberjs.com/';
var config        = require('../util/config');
var msg           = require('../util/message');

module.exports = function(version, tag){
  if (!version || version === 'r') version = 'release';
  if (version === 'b' ) version = 'beta';
  if (version === 'c' ) version = 'canary';
  if (version === 't' ) version = 'tags';
  if (version === 'tags') {
    if (!tag) {
      msg.error('When updating by tags a version must be passed as well eg. v1.1.1');
      process.exit(1);
    }
  }
  else if (version !== 'release' && version !== 'beta' && version !== 'canary'){
    msg.error('Please use "release", "beta", "canary" or "tags"');
    process.exit(1);
  }
  var file = DOWNLOAD_ROOT + (version === 'tags' ? version + '/' + tag : version) + '/ember.js';
  var configuration = config();
  console.log('Downloading',file + '...');
  var emberPath = process.cwd() + "/" + configuration.jsPath + '/vendor/ember.js';
  var emberJSWriteStream = fs.createWriteStream(emberPath, {encoding: 'utf8',flags: 'w'});
  request.get(file).pipe(emberJSWriteStream).on('close',function(){
    msg.notify('Updated!');
  });
};
