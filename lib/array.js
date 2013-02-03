require('./object');

Array.new = function(size_or_array, value_or_fn) {
  if (arguments.length === 2) {
    var size = size_or_array, 
        ary = [],
        fn = (new Object(value_or_fn)).is_a('Function');
    for(var i=0; i<size; i++) {
      var val = fn ? value_or_fn(i) : value_or_fn;
      ary.push(val);
    }
    return ary;
  } 
  else if (arguments.length === 1) {
    if(size_or_array instanceof Array) {
      return Array.apply(Array, size_or_array);
    } else {
      return new Array(size_or_array);
    }
  } 
  return [];
}

