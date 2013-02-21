require('../ruby');

var even_fn = function(x) { return x % 2 == 0; };

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
  },
  'destructured': function() {
    assert.equals( [[1, 2], [2, 3]].map(function(a, b) { return a + b; }), [3, 5] );
  }
});

buster.testCase('Enumerable#any', {
  'no block': function() {
    assert( [null, 'a'].any() );
    refute( [null, undefined, false].any() );
  },
  'works': function() {
    assert( [1, 2, 3].any(even_fn) );
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
    assert.equals( 1, [1, 2, 3].count(even_fn) );
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
    assert.equals( [ 1, 2, 3 ].detect(even_fn), 2 );
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
  },
  'destructured': function() {
    var vals = [];
    [1, 2, 3, 4].each_cons(2, function(a, b) {
      vals.push( a*b );
    });
    assert.equals( vals, [2, 6, 12] );
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
  },
  'destructured': function() {
    var vals = [];
    [1, 2, 3, 4, 5, 6].each_slice(3, function(a, b, c) { vals.push(a+b+c); });
    assert.equals( vals, [6, 15] );
  }
});

buster.testCase('Enumerable#find_all #select', {
  'no block': function() {
    assert.equals( [1, 2, 3], [1, 2, 3].find_all().to_a() );
  },
  'with block': function() {
    assert.equals( [1, 2, 3, 4].select(even_fn), [2, 4] );
  }
});

buster.testCase('Enumerable#find_index', {
  'no block': function() {
    assert.equals( [1, 2, 3], [1, 2, 3].find_index().to_a() );
  },
  'with value': function() {
    assert.equals( 2, ['a', 'b', 'c'].find_index('c') );
    assert.equals( null, [1, 2, 3].find_index(5) );
  },
  'with block': function() {
    assert.equals( 1, [1, 2, 3].find_index(even_fn) );
    assert.equals( null, [1, 2].find_index(function(x) { return x > 5; } ) );
  }
});

buster.testCase('Enumerable#first', {
  'no amount': function() {
    assert.equals( null, [].first() );
    assert.equals( 1, [1, 2, 3].first() );
  },
  'with amount': function() {
    assert.equals( [1, 2], [1, 2, 3, 4].first(2) );
  }
});

buster.testCase('Enumerable#take', {
  'works': function() {
    assert.equals( [1, 2], [1, 2, 3, 4].take(2) );
  }
});

buster.testCase('Enumerable#group_by', {
  'no block': function() {
    assert.equals( [1, 2], [1, 2].group_by().to_a() );
  },
  'with block': function() {
    var fn = function(x) { return x % 3; };
    assert.equals( { 0: [3, 6], 1: [1, 4], 2: [2, 5]}, [1, 2, 3, 4, 5, 6].group_by(fn) );
  }
});

buster.testCase('Enumerable#include', {
  'works': function() {
    assert( [1, 2].include(2) );
    refute( [1, 2].member(8) );
  }
});

buster.testCase('Enumerable#each_with_index', {
  'no block': function() {
    assert( [['a', 0], ['b', 1]], ['a', 'b'].each_with_index() );
  },
  'with block': function() {
    var s = '';
    ['a', 'b', 'c'].each_with_index(function(x, i) { s += x + i; });
    assert( s, 'a0b1c2' );
  }
});

buster.testCase('Enumerable#each_with_object', {
  'no block': function() {
    assert( [1, 2, 3].each_with_object('a'), [[1, 'a'], [2, 'a'], [3, 'a']] );
  }, 
  'with block': function() {
    assert( [2, 4, 6], [1, 2, 3].each_with_object([], function(val, ary) { ary.push(val); }) );
  }
});

buster.testCase('Enumerable#inject #reduce', {
  'no block': function() {
    assert.equals( null, [1, 2, 3].inject() );
  },
  'with symbol': function() {
    assert.equals( [[1], [2], [3]].inject('append'), [1, 2, 3] );
  },
  'with value and symbol': function() {
    assert.equals( ['b', 'c', 'd'].inject('a', 'concat'), 'abcd' );
  },
  'with block': function() {
    var fn = function(sum, n) { return sum + n; }
    assert.equals( [1, 2, 3].inject(fn), 6 );
  },
  'with value and block': function() {
    var fn = function(product, n) { return product * n; };
    assert.equals( [1, 2, 3].inject(1, fn), 6 );
  }
});

buster.testCase('Enumerable#none', {
  'no block': function() {
    assert( [].none() );
    assert( [null, false, undefined].none() );
  },
  'with block': function() {
    refute( [1, 2, 3].none(function(x) { return x < 4; }) );
    assert( [1, 2, 3].none(function(x) { return x > 5; }) )
  },
});

buster.testCase('Enumerable#one', {
  'no block': function() {
    assert( [5, null, false, undefined].one() );
    refute( ['a', 'b'].one() );
  },
  'with block': function() {
    assert( [1, 2, 3].one(even_fn) );
    refute( ['aaa', 'bbb', 'cccc'].one(function(x) { return x.length === 3 }) );
  }
});

buster.testCase('Enumerable#partition', {
  'no block': function() {
    assert.equals( [1, 2], [1, 2].partition().to_a() );
  },
  'with block': function() {
    assert.equals( [[2, 4], [1, 3]], [1, 2, 3, 4].partition(even_fn) );
  }
});

buster.testCase('Enumerable#reject', {
  'no block': function() {
    assert.equals( [1, 2], [1, 2].reject().to_a() );
  },
  'with block': function() {
    assert.equals( [1, 3], [1, 2, 3, 4].reject(even_fn) );
  }
});

buster.testCase('Enumerable#reverse_each', {
  'no block': function() {
    assert.equals( [1, 2, 3].reverse_each().to_a(), [3, 2, 1] );
  },
  'with block': function() {
    var s = '';
    [1, 2, 3].reverse_each(function(n) { s += n; });
    assert.equals( s, '321' );
  }
});










