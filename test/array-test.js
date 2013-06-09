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
  },
  
  '#each': function() {
    var obj = {};
    ['a', 'b', 'c'].each(function(val, ind, hash) { hash[val] = ind + 1; }, obj);
    assert.equals( { a: 1, b: 2, c: 3 }, obj );
  }
  
  
});







