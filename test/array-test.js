// Tests array.js

require('../ruby');

buster.testCase('Array', {
  
  '::new': {
    'default value': function() {
      assert.equals( ['hi', 'hi', 'hi'], Array.new(3, 'hi') );
    },
    
    'block with index': function() {
      assert.equals( [0, 1, 2], Array.new(3, function(i){ return i; }) );
    }
  },
  
  '#compact': function() {
    assert.equals( ['a'], ['a', null, undefined].compact() );
  },
  
  '#at': function() {
    var a = [1, 2, 3];
    assert.equals( undefined, a.at(6) );
    assert.equals( 1, a.at(0) );
    assert.equals( 3, a.at(-1) );
  },
  
  '#clear': function() {
    assert.equals( [], ['hey', 4, 2].clear() );
  },
  
  '#append': function() {
    var a = [1, 2];
    a.append(a);
    assert.equals( [1, 2, 1, 2], a );
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
  'destructures': function() {
    var a = [[1, 1], [1, 2]];
    var s = "";
    a.each(function(a, b) { s += (a+b); });
    assert.equals( s, "23")
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









