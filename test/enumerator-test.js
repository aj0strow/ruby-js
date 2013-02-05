// Tests enumerator.js

require('../ruby');

buster.testCase('Enumerator::new', {
  setUp: function() {
    this.en =  Enumerator.new(5, function(i) { return i; });
  },
  'creates obj': function() {
    assert.equals( class_of(this.en), 'Enumerator' );
  },
  'has length': function() {
    assert.equals( this.en.length, 5 );
  },
  'has next method': function() {
    assert.equals( class_of(this.en.get_value_at), 'Function');
  },
  'takes a raw array': function() {
    var a = [1, 2, 3];
    assert.equals( Enumerator.new(a).to_a(), a );
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


buster.testCase('Enumerator#with_index', {
  'iterates on start index': function() {
    var a = ['a', 'b', 'c'];
    var en = Enumerator.new(a.length, function(i) { return a[i]; });
    var vals = '';
    var indeces = '';
    var fn = function(x, i) { vals += x; indeces += i }
    
    assert.equals( ['a', 'b', 'c'], en.with_index(4, fn) );
    assert.equals( vals, 'abc' );
    assert.equals( indeces, '456' );
  }
});

buster.testCase('Enumerator#each_with_index', {
  'iterates': function() {
    var a = ['a', 'b', 'c'];
    var en = Enumerator.new(a.length, function(i) { return a[i]; });
    var vals = '';
    var indeces = '';
    var fn = function(x, i) { vals += x; indeces += i }
    
    assert.equals( ['a', 'b', 'c'], en.each_with_index(fn) );
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

buster.testCase('Enumerator#peek', {
  setUp: function() {
    var a = [1, 2];
    this.en = Enumerator.new(a.length, function(i) { return a[i]; });
  },
  'returns value': function() {
    assert.equals( 1, this.en.peek() );
  },
  'doesnt exhaust values': function() {
    var en = this.en;
    var x = en.peek(), y = en.next();
    
    assert.equals(x, y);
    refute.exception( function() { 
      en.next();
    } );
  }
});

buster.testCase('Enumerator#peek_values', {
  'returns array always': function() {
    var a = [1, 2, 3];
    var vals = Enumerator.new(a.length, function(i) { return a[i]; });
    var with_indeces = Enumerator.new(a.length, function(i) { return [a[i], i]; });
    
    assert.equals(vals.peek_values(), [1]);
    assert.equals(with_indeces.peek_values(), [1, 0]);
  }
});

buster.testCase('Enumerable#to_a', {
  'returns the array': function() {
    var a = [1, 2, 3];
    var en = Enumerator.new(a.length, function(i) { return a[i]; });
    assert.equals(en.to_a(), a);
  }
});






