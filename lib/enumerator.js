/*
 * Enumerator
 *
 * length: length of abstract array
 * next_fn: fn(index) to determine next element
*/

Enumerator = function(length, next_fn) {
  this.length = length;
  this.next_fn = next_fn;
}

Enumerator.new = function(length, next_fn) {
  return (new Enumerator(length, next_fn));
}

Enumerator.prototype = {
  
  class: function() {
    return 'Enumerator';
  },
  
  each: function(fn) {
    var ary = [];
    for (var i=0; i<this.length; i++) {
      var val = this.next_fn(i);
      ary.push(val);
      fn(val);
    }
    return ary;
  },
  
  with_index: function(start_index, fn) {
    if(arguments.length === 1) {
      fn = start_index;
      start_index = 0;
    }
    
    var ary = [];
    for (var i=0; i<this.length; i++) {
      var val = this.next_fn(i);
      ary.push(val);
      fn(val, start_index + i);
    }
    return ary;
  },
  
  each_with_index: function(fn) {
    return this.with_index(0, fn);
  },
  
  with_object: function(obj, fn) {
    for (var i=0; i<this.length; i++) {
      fn( this.next_fn(i), obj );
    }
    return obj;
  },
  
  each_with_object: function(obj, fn) {
    return this.with_object(obj, fn);
  },
  
  next: function() {
    var val = this.peek();
    this.length --;
    return val;
  },
  
  next_values: function() {
    var val = this.peek_values();
    this.length --;
    return val;
  },
  
  peek: function() {
    if (this.length <= 0) {
      throw new Error('StopIteration - enumerator is empty');
    }
    return this.next_fn(0);
  },
  
  peek_values: function() {
    var n = this.peek();
    return (Object(n).class() == 'Array') ? n : [n];
  }
  
  
  
  
  
  
  
  
}