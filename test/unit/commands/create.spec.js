var create = require('../../../src/commands/create');

describe('create.getPaths', function() {
  it('defaults to application path "." and asset path "./js"', function() {
    create.getPaths({}).should.eql({
      app: '.',
      js: './js',
      jsRelative: 'js'
    });
  });

  it('uses first argument for application path', function() {
    create.getPaths('my-app', {}).should.eql({
      app: 'my-app',
      js: 'my-app/js',
      jsRelative: 'js'
    });
  });

  it('returns false when > 2 arguments are passed in', function() {
    create.getPaths(1, 2, 3).should.eql(false);
  });

  it('uses env.jsPath', function() {
    create.getPaths({jsPath: 'public/js'}).should.eql({
      app: '.',
      js: './public/js',
      jsRelative: 'public/js'
    });
  });
});

