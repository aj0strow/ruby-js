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

console.log((new Array(5))[0]);