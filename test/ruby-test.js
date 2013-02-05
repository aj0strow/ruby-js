var ruby = require('../ruby');
var extend_class = ruby.extend_class;

buster.testCase('class_of', {
  'object': function() {
    assert.equals( 'Object', class_of({}) );
  },
  'array': function() {
    assert.equals( 'Array', class_of([]) );
  },
  'function': function() {
    assert.equals( 'Function', class_of(function(){}) );
  },
  'string': function() {
    assert.equals( 'String', class_of('') );
  },
  'number': function() {
    assert.equals( 'Number', class_of(5) );
  },
  'enumerator': function() {
    assert.equals( 'Enumerator', class_of(Enumerator.new(3, null)) );
  }
});

buster.testCase('extend_class', {
  'inheritance': function() {
    var Test = function() {
      this.val = 5;
    }
    
    Test.prototype.value = function() {
      return this.val;
    }
    
    var Other = function() {
      this.val = 2;
    }

    extend_class(Other, Test);

    var o = new Other();
    
    assert.equals( o.value(), 2 );
  }
});