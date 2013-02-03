// Tests array.js

var buster = require('buster');
var ruby = require('../ruby');
var _ = require('underscore');

buster.testCase('Array::new', {
  'no args': function () {
    assert( _.isEqual([], []) );
  },
  'size': function() {
    assert( _.isEqual(Array.new(3), [null, null, null]) );
  },
  'default': function() {
    assert( _.isEqual(Array.new(3, 'hi'), ['hi', 'hi', 'hi']) );
  },
  'block': function() {
    var block = function(i) { return i * 2; };
    assert( _.isEqual(Array.new(5, block), [0, 2, 4, 6, 8]) );
  }
});

buster.testCase('Array#at', {
  setUp: function() {
    this.a = [1, 2, 3];
  },
  'out of range': function() {
    assert( _.isEqual(null, this.a.at(6)) );
    assert( _.isEqual(null, this.a.at(-4)) );
  },
  'positive index': function() {
    assert( _.isEqual(1, this.a.at(0)) );
    assert( _.isEqual(2, this.a.at(1)) );
  },
  'negative index': function() {
    assert( _.isEqual(3, this.a.at(-1)) );
    assert( _.isEqual(2, this.a.at(-2)) );
  }
});

buster.testCase('Array#clear', {
  'empties ary': function() {
    assert( _.isEqual(['hey', 4, 2].clear(), []) );
  }
});

buster.testCase('Array#map #collect', {
  'block': function() {
    assert( _.isEqual([2, 3, 4], [1, 2, 3].map(function(x) { return x + 1; } )) );
    assert( _.isEqual(['1', '2', '3'], [1, 2, 3].collect(function(x) { return '' + x; } )) );
  },
  'symbol': function() {
    assert( _.isEqual([1, 1, 2], ['a', 'b', 'cc'].map('length')) );
    assert( _.isEqual(['a', 'b', 'c'], [{k: 'a'}, {k: 'b'}, {k: function() { return 'c';} }].collect('k')) );
  }
});

buster.testCase('Array#compact', {
  'remove null': function() {
    assert( _.isEqual([1, 2], [1, null, 2, null].compact()) );
  },
  'remove und': function() {
    assert( _.isEqual([1, undefined, 2].compact(), [1, 2]) );
  }
});



