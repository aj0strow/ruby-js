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

buster.testCase('Enumerable#flat_map #collect_concat', {
  'no block': function() {
    assert.equals( [[1, 2], 3], [[1, 2], 3].flat_map().to_a() );
  },
  'acts on flattened': function() {
    assert.equals( [1, 2, 3], [[1, 2], 3].flat_map(function(x) { return x; }) );
  },
  'synonym': function() {
    assert.equals( [1, 2, 3], [[1, 2], 3].collect_concat(function(x) { return x; }) );
  }
});

buster.testCase('Enumerable#count', {
  'no args': function() {
    assert.equals( 3, [1, 1, 1].count() );
  },
  'value': function() {
    assert.equals( 2, [1, 3, 1].count(1) );
  },
  'block': function() {
    assert.equals( 1, [1, 2, 3].count(function(x) { return x % 2 == 0; }) );
  }
});

buster.testCase('Enumerable#cycle', {
  'block and amount': function() {
    var out = "";
    [1, 2, 3].cycle(2, function(x) { out += x; });
    assert.equals( out, "123123" );
  },
  'enumerator': function() {
    var en = [1, 2].cycle(3);
    assert.equals( en.length, 6 );
    assert.equals([1, 2].cycle(3).to_a(), [1, 2, 1, 2, 1, 2] );
  }
});

buster.testCase('Enumerable#detect', {
  'no args': function() {
    assert.equals( [null, null, 3, undefined, 5].detect(), 3);
  },
  'works': function() {
    assert.equals( [ 1, 2, 3 ].detect(function(x) { return x > 6; }), null );
    assert.equals( [ 1, 2, 3 ].detect(function(x) { return x % 2 == 0; }), 2 );
  }
});

buster.testCase('Enumerable#each_cons', {
  'no block': function() {
    assert.equals( [1, 2, 3, 4].each_cons(2).to_a(), [[1, 2], [2, 3], [3, 4]] );
  },
  'with block': function() {
    var s = '';
    [2, 3, 4].each_cons(2, function(vals) {
      s += (vals[1] - vals[0]);
    });
    assert.equals( '11', s );
  }
});

buster.testCase('Enumerable#each_slice', {
  'no block': function() {
    assert.equals( [[1, 2], [3, 4]], [1, 2, 3, 4].each_slice(2).to_a() );
  },
  'with block': function() {
    var odds = 0;
    var evens = 0;
    [1, 2, 3, 4, 5, 6].each_slice(2, function(a) { odds += a[0]; evens += a[1]; });
    assert.equals( odds, 9 );
    assert.equals( evens, 12 );
  }
});















