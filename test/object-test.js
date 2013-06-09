// Tests object.js

require('../ruby');

buster.testCase('Object', {
  
  'class': function() {
    assert.equals( Object, {}.class() );
    assert.equals( String, 'str'.class() );
    assert.equals( Number, (5).class() );
    assert.equals( Boolean, (true).class() );
    assert.equals( Function, (function() {}).class() );
    assert.equals( RegExp, /regexp/.class() );
  }
  
});