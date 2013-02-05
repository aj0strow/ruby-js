require('../ruby');

buster.testCase('Enumerable#all', {
  'no block': function() {
    refute( [1, 2, null].all() );
    refute( [false, 2, 'hey'].all() );
    assert( [].all() );
    assert( ['anything', {}].all() );
  },
  'works': function() {
    assert( [5, 6, 7].all(function(x) { return x > 3; }) );
    refute( ['a', 'a', 'b'].all(function(c) { return c === 'a'; }) );
  }
});

buster.testCase('Enumerable#map #collect', {
  'block': function() {
    assert.equals( [2, 3, 4], [1, 2, 3].map(function(x) { return x + 1; }) );
    assert.equals( ['1', '2', '3'], [1, 2, 3].collect(function(x) { return '' + x; }) );
  },
  'symbol': function() {
    assert.equals( [1, 1, 2], ['a', 'b', 'cc'].map('length') );
    assert.equals( ['a', 'b', 'c'], [{k: 'a'}, {k: 'b'}, {k: function() { return 'c';} }].collect('k') );
  },
  'enumerator': function() {
    assert.equals( [1, 2].map().to_a(), [1, 2] );
  }
});

buster.testCase('Enumerable#any', {
  'no block': function() {
    assert( [null, 'a'].any() );
    refute( [null, undefined, false].any() );
  },
  'works': function() {
    assert( [1, 2, 3].any(function(x) { return x % 2 === 0; }) );
    refute( [23, 'b', 4.12].any(function(x) { return x === null; }) );
  }
});