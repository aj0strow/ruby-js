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
  
  each_with_index: function(fn) {
    var ary = [];
    for (var i=0; i<this.length; i++) {
      var val = this.next_fn(i);
      ary.push(val);
      fn(val, i);
    }
    return ary;
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
    if (this.length <= 0) {
      throw new Error('StopIteration - enumerator is empty');
    } else {
      this.length --;
      return this.next_fn(0);
    }
  },
  
  next_values: function() {
    var n = this.next();
    if (Object(n).class() == 'Array') {
      return n;
    } else {
      return [n];
    }
  }
  
  
  
  
  
  
  
  
  
  
}