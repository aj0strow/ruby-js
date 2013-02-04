// Tests enumerator.js

require('../ruby');

buster.testCase('Enumerator::new', {
  setUp: function() {
    this.en =  Enumerator.new(5, function(i) { return i; });
  },
  'creates obj': function() {
    assert.equals( this.en.class(), 'Enumerator' );
  },
  'has length': function() {
    assert.equals( this.en.length, 5 );
  },
  'has next method': function() {
    assert.equals( this.en.next_fn.class(), 'Function');
  }
});

buster.testCase('Enumerator#each', {
  'iterates': function() {
    var a = [1, 2, 3];
    var en = Enumerator.new(a.length, function(i) { return a[i]; });
    var s = '';
    assert.equals( [1, 2, 3], en.each(function(x) { s += x; }) );
    assert.equals( s, '123' );
  }
});

buster.testCase('Enumerator#each_with_index', {
  'iterates': function() {
    var a = ['a', 'b', 'c'];
    var en = Enumerator.new(a.length, function(i) { return a[i]; });
    var vals = '';
    var indeces = '';
    assert( _.isEqual(['a', 'b', 'c'], en.each_with_index(function(x, i) { 
      vals += x;
      indeces += i;
    })) );
    assert.equals( vals, 'abc' );
    assert.equals( indeces, '012' );
  }
});

buster.testCase('Enumerator#with_object', {
  setUp: function() {
    var a = ['a', 'b', 'c'];
    this.en = Enumerator.new(a.length, function(i) { return a[i]; });
  },
  'mutates': function() {
    var obj = { a: 20, b: 30, c: 40 };
    var out = this.en.with_object(obj, function(key, table) { obj[key] = obj[key] / 2 });
    
    assert.equals( out, { a: 10, b: 15, c: 20} );
    assert.same( out, obj );
  }
});

buster.testCase('Enumerator#each_with_object', {
  'same as with_object': function() {
    var a = ['a', 'b', 'c'];
    var rates = { a: 20, b: 30, c: 40 };
    var en = Enumerator.new(a.length, function(i) { return a[i]; });
    var fn = function(obj, key) {
      obj[key] = rates[key] * 2;
    }
    
    assert.equals( en.each_with_object({}, fn), en.with_object({}, fn) );
  }
});

buster.testCase('Enumerator#next', {
  setUp: function() {
    var a = [1];
    this.en = Enumerator.new(a.length, function(i) { return a[i]; });
  },
  'gets next value': function() {
    assert.equals( 1, this.en.next() );
  },
  'raises exception': function() {
    this.en.next();
    assert.exception( function() { this.en.next() } );
  }
});

buster.testCase('Enumerator#next_values', {
  'returns array always': function() {
    var a = [1, 2, 3];
    var vals = Enumerator.new(a.length, function(i) { return a[i]; });
    var with_indeces = Enumerator.new(a.length, function(i) { return [a[i], i]; });
    
    assert.equals(vals.next_values(), [1]);
    assert.equals(with_indeces.next_values(), [1, 0]);
  }
});












