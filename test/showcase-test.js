require('../ruby');

buster.testCase('Showcase', {
  'collect with keys': function() {
    var records = [{ name: 'AJ', age: 19 }, { name: 'Eli', age: 17 }];
    var names = records.collect('name');
    assert.equals( names, ['AJ', 'Eli'] );
    
    assert.equals( ['JA', 'ilE'], names.map('reverse') );
  },
  'reject below': function() {
		function below(min) {
			return function(x) { return x < min };
		}
		
		assert.equals( [25, 4, 8, 23, 19].reject( below(20) ), [25, 23] );
  }
});