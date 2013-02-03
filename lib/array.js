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
  
  function evaluate(item, key) {
    var fn = Object(item[key]).class() === 'Function';
    return fn ? item[key]() : item[key];
  }
  
  var ary = [];
  for(var i=0; i<this.length; i++) {
    ary.push( evaluate(this[i], key) );
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
  var ary = [];
  for(var i=0; i<this.length; i++) {
    ary.push(this[i]);
  }
  for(var i=0; i<other_ary.length; i++) {
    ary.push(other_ary[i]);
  }
  return ary;
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
    for (var times=0; times<amount; times++) {
      for(var i=0; i<this.length; i++) {
        ary.push(this[i]);
      }
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













