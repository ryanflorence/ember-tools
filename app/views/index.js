var Ember = require('ember');

var Index = Ember.View.extend({

  alert: function() {
    console.log('lol!');
  }.on('didInsertElement')

});

module.exports = Index;

