// Tests array.js

require('../ruby');

buster.testCase('Array::new', {
  'no args': function () {
    assert.equals( [], Array.new() );
  },
  'size': function() {
    assert.equals( Array.new(3), [null, null, null] );
  },
  'default': function() {
    assert.equals( Array.new(3, 'hi'), ['hi', 'hi', 'hi'] );
  },
  'block': function() {
    var block = function(i) { return i * 2; };
    assert.equals( Array.new(5, block), [0, 2, 4, 6, 8] );
  }
});

buster.testCase('Array#at', {
  setUp: function() {
    this.a = [1, 2, 3];
  },
  'out of range': function() {
    assert.equals( null, this.a.at(6) );
    assert.equals( null, this.a.at(-4) );
  },
  'positive index': function() {
    assert.equals( 1, this.a.at(0) );
    assert.equals( 2, this.a.at(1) );
  },
  'negative index': function() {
    assert.equals( 3, this.a.at(-1) );
    assert.equals( 2, this.a.at(-2) );
  }
});

buster.testCase('Array#clear', {
  'empties ary': function() {
    assert.equals( ['hey', 4, 2].clear(), [] );
  }
});

buster.testCase('Array#compact', {
  'remove null': function() {
    assert.equals( [1, 2], [1, null, 2, null].compact() );
  },
  'remove und': function() {
    assert.equals( [1, undefined, 2].compact(), [1, 2] );
  }
});

buster.testCase('Array#concat', {
  'appends': function() {
    assert.equals( [1, 2, 3, 4], [1, 2].concat([3, 4]) );
  }
});

buster.testCase('Array#drop', {
  'removes first elements': function() {
    assert.equals([1, 2, 3].drop(2), [3] );
    assert.equals([1, 2, 3].drop(4), [] );
  }
});

buster.testCase('Array#drop_while', {
  'below 3': function() {
    assert.equals([1, 2, 3, 4].drop_while(function(x) { return x < 3; }), [3, 4] );
  },
  'no block': function() {
    assert.equals([1, 2].drop_while(), [1, 2] );
  }
});

buster.testCase('Array#each', {
  'iterates': function() {
    var s = "";
    var a = [1, 2, 3];
    var output = a.each( function(n) { s += n; } );
    
    var arys = [[1], [2]];
    
    assert.equals( a, output )
    assert.equals( s, "123" );
    assert.equals( arys.each('clear'), [[], []] );
  },
  'no args': function() {
    assert.equals( [1].each().to_a(), [1] );
  }
});

buster.testCase('Array#each_index', {
  'iterates': function() {
    var a = [3, 4, 5];
    var s = "";
    var output = a.each_index(function(i) { s += i; });
    
    assert.equals( a, output );
    assert.equals( s, "012" );
  },
  'enumerator': function() {
    assert.equals( [0, 1, 2], [3, 4, 5].each_index().to_a() );
  }
});

// Added methods

buster.testCase('Array#append', {
  'appends array': function() {
    assert.equals([1, 2].append([3, 4]), [1, 2, 3, 4] );
  }
});









