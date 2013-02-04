// Helpers

function symbol_to_proc(obj, key) {
  var fn = Object(obj[key]).class() === 'Function';
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
        fn = Object(value_or_fn).class() === 'Function';
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

Array.prototype.map = function(fn) {
  
  if (! (Object(fn).class() === 'Function') ) {
    return this.collect(fn);
  }
  
  var ary = [];
  for(var i=0; i<this.length; i++) {
    ary.push( fn(this[i]) );
  }
  return ary;
}

Array.prototype.collect = function(key) {
  
  if (Object(key).class() === 'Function') {
    return this.map(key);
  }
  
  var ary = [];
  for(var i=0; i<this.length; i++) {
    ary.push( symbol_to_proc(this[i], key) );
  }
  return ary;
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

Array.prototype.count = function(val_or_fn) {
  if (arguments.length === 1) {
    var fn = Object(val_or_fn).class() === 'Function';
    var count = 0;
    for(var i=0; i<this.length; i++) {
      if (fn) {
        if( val_or_fn(this[i]) ) count++;
      } else { 
        if (val_or_fn === this[i]) count++;
      }
    }
    return count;
  }
  return this.length;
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
    var ary = [];
    for (var i=0; i<amount; i++) {
      ary.append(this);
    }
    return ary;
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
  var is_fn = Object(fn_or_symbol).class() === 'Function';
  
  for (var i=0; i<this.length; i++) {
    is_fn ? fn_or_symbol(this[i]) : symbol_to_proc(this[i], fn_or_symbol);
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






