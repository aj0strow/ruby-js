// Tests object.js

require('../ruby');

buster.testCase('Object::new', {
  'no args': function() {
    assert.equals( {}, RObject.new() );
  },
  'string or array or function': function() {
    var fn = function() {};
    assert.same( fn, RObject.new(fn) );
    var str = '';
    assert.same( str, RObject.new(str) );
    var ary = [];
    assert.same( ary, RObject.new(ary) );
  },
  'number': function() {
    assert.equals( 5, RObject.new(5) );
  }
});