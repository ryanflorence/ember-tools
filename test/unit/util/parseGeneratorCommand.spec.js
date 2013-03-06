var parse = require('../../../src/util/parseGeneratorCommand');

describe('parseGeneratorCommand', function() {

  it('it exists', function() {
    parse.should.be.ok;
  });

  it('parses -m taco', function() {
    var args = [{
      model: 'taco'
    }];
    parse(args).should.eql({
      model: 'taco',
      resourceName: 'taco'
    });
  });

  it('parses -mv taco', function() {
    var args = [{model: true, view: 'taco'}];
    parse(args).should.eql({
      model: 'taco',
      view: 'taco',
      resourceName: 'taco'
    });
  });

  it('parses -vm taco', function() {
    var args = [{view: true, model: 'taco'}];
    parse(args).should.eql({
      model: 'taco',
      view: 'taco',
      resourceName: 'taco'
    });
  });


  it('parses -m taco shell:string', function() {
    var args = [
      'shell:string',
      { model: 'taco'}
    ];
    parse(args).should.eql({
      model: 'taco',
      resourceName: 'taco',
      fields: [{name: 'shell', type: 'string', comma: ''}]
    });
  });

  it('parses -m taco shell:string meat:string', function() {
    var args = [
      'shell:string',
      'meat:string',
      { model: 'taco' }
    ];
    parse(args).should.eql({
      model: 'taco',
      resourceName: 'taco',
      fields: [
        {name: 'shell', type: 'string', comma: ','},
        {name: 'meat', type: 'string', comma: ''}
      ]
    });
  });

});
