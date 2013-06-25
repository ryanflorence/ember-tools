var fs            = require('fs');
var request       = require('request');
var DOWNLOAD_ROOT = 'http://builds.emberjs.com/';
var EMBER_STABLE  = DOWNLOAD_ROOT + 'ember-latest-stable.js';
var EMBER_LATEST  = DOWNLOAD_ROOT + 'ember-latest.js';
var config        = require('../util/config');

module.exports = function(version){
  if (!version || version === 's') version = 'stable';
  if (version === 'l' ) version = 'latest';
  if (version !== 'stable' && version !== 'latest'){
    console.warn('Please use "stable" or "latest"');
    process.exit(1);
  }
  var file = (version === 'latest') ? EMBER_LATEST : EMBER_STABLE;
  var configuration = config();
  console.log('Downloading',file + '...');
  var emberPath = process.cwd() + "/" + configuration.jsPath + '/vendor/ember.js';
  var emberJSWriteStream = fs.createWriteStream(emberPath, {encoding: 'utf8',flags: 'w'});
  request.get(file).pipe(emberJSWriteStream).on('close',function(){
    console.log('Updated!');
  });
};
