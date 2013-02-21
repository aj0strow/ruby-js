require('../ruby');

buster.testCase('String#reverse', {
  'works': function() {
    assert.equals( 'abc'.reverse(), 'cba' );
  }
});