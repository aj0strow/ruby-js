// Helpers

function symbol_to_proc(obj, key) {
  var fn = class_of(obj[key]) === 'Function';
  return fn ? obj[key]() : obj[key];
}

// Ruby methods

Array.new = function(size_or_array, value_or_fn) {
  if (size_or_array instanceof Array) {
    return Array.apply(Array, size_or_array);
  } 
  else if (arguments.length > 0) {
    if (arguments.length === 1) {
      value_or_fn = null;
    }
    var size = size_or_array, 
        ary = [],
        fn = class_of(value_or_fn) === 'Function';
    for(var i=0; i<size; i++) {
      var val = fn ? value_or_fn(i) : value_or_fn;
      ary.push(val);
    }
    return ary;
  } 
  return [];
}

Array.prototype.at = function(i) {
  if (i >= this.length || i * -1 > this.length) {
    return null;
  } else {
    var index = i < 0 ? this.length + i : i;
    return this[index];
  }
}

Array.prototype.clear = function() {
  this.length = 0;
  return this;
}

Array.prototype.compact = function() {
  var ary = [];
  for(var i=0; i<this.length; i++) {
    if (! (this[i] === null || this[i] === undefined)) {
      ary.push(this[i]);
    }
  }
  return ary;
}

Array.prototype.concat = function(other_ary) {
  return this.slice(0).append(other_ary);
}



Array.prototype.cycle = function(amount, block) {
  if (arguments.length === 2) {
    for (var iter = 0; iter < amount; iter++) {
      for (var i=0; i<this.length; i++) {
        block(this[i]);
      }
    }
    return null;
  } else {
    var a = this;
    var length = this.length;
    var fn = function(i) { return a[i % length]; }
    return Enumerator.new(amount * this.length, fn);
  }
}

Array.prototype.drop = function(n) {
  var ary = [];
  for (var i=n; i<this.length; i++) {
    ary.push(this[i]);
  }
  return ary;
}

Array.prototype.drop_while = function(fn) {
  if (arguments.length === 0) return this;
  
  var i = 0;
  while ( i < this.length && fn(this[i]) ) i++;
  
  return this.slice(i);
}

Array.prototype.each = function(fn_or_symbol) {
  if (arguments.length === 0) {
    var a = this;
    return Enumerator.new(this.length, function(i) { return a[i] });
  }
  var is_fn = class_of(fn_or_symbol) === 'Function';
  
  for (var i=0; i<this.length; i++) {
    is_fn ? fn_or_symbol(this[i]) : symbol_to_proc(this[i], fn_or_symbol);
  }
  return this;
}

Array.prototype.each_index = function(fn) {
  if (arguments.length === 0) {
    return Enumerator.new(this.length, function(i) { return i; });
  }
  for (var i=0; i<this.length; i++) {
    fn(i);
  }
  return this;
}




// New Methods

Array.prototype.append = function(ary) {
  for (var i = 0; i<ary.length; i++) {
    this.push( ary[i] );
  }
  return this;
}



