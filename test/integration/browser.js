stop();
Ember.onLoad(start);

test('app', function() {
  ok($('.ember-view').length);
});

