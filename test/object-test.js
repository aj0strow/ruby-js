// Tests object.js

var buster = require('buster');
var ary = require('../ruby');

buster.testCase('Object', {
  /*
    'is_a': function() {
      assert( {}.is_a('Object') );
      assert( (function() {}).is_a('Function') );
    },
  */
    'class': function() {
      assert( 'Object' === {}.class() );
      assert( 'Number' === Object(5).class() );
    }
});

