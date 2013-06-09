require('../ruby');

buster.testCase('String', {
  
  '#reverse': function() {
    assert.equals( 'abc'.reverse(), 'cba' );
  },
  
  '#capitalize': function() {
    assert.equals( 'aBcDe'.capitalize(), 'Abcde' );
  },
  
  '#clear': function() {
    assert.equals( 'awef'.clear(), '' );
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
  }
  
});