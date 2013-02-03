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