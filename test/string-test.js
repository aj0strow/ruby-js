require('../ruby');

buster.testCase('String', {
  
  '#reverse': function() {
    assert.equals( 'abc'.reverse(), 'cba' );
  },
  
  '#capitalize': function() {
    assert.equals( 'aBcDe'.capitalize(), 'Abcde' );
  },
  
  '#downcase': function() {
    assert.equals( 'aBcDe'.downcase(), 'abcde' );
  },
  
  '#upcase': function() {
    assert.equals( 'AbCdE'.upcase(), 'ABCDE');
  },
  
  '#scan': {
    'fullMatch': function() {
      assert.equals( ['ab', 'cd'], 'abcd'.scan(/../) );
    },
    'matchGroups': function() {
      assert.equals( [['a', 'b'], ['c', 'd']], 'abcd'.scan(/(.)(.)/) );
    },
    'numbers': function() {
      assert.equals( ['1', '12', '123'], '1aliwefj12 awelifj  123'.scan(/\d+/) );
    }
  },
  
  '#strip': function() {
    assert.equals( 'hello', '\n  hello  \r'.strip() );
  },
  
  '#gsub': {
    'val': function() {
      assert.equals( 'cat cat', 'dog dog'.gsub(/dog/, 'cat') );
    },
    'object': function() {
      assert.equals( 'a2c4e', 'abcde'.gsub(/[a-e]/, { b: 2, d: 4 }) );
    },
    'function': function() {
      assert.equals( 'incr 2, 3, 4', 'incr 1, 2, 3'.gsub(/\d/, function(x) { return parseInt(x) + 1; }) );
    }
  }
  
});