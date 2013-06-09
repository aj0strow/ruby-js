(function() {
  
  Array.new = function(size, fn_or_val) {
    var ary = new Array(size);
    var fn = (fn_or_val instanceof Function) ? fn_or_val : function () { 
      return fn_or_val; 
    };
    for (var i=0; i < size; i++) { 
      ary[i] = fn(i);
    }
    return ary;
  };
  
  var ext = {
    
    at: function(i) {
      return i < 0 ? this[this.length + i] : this[i];
    },
    
    clear: function() {
      this.length = 0;
      return this;
    },
    
    compact: function() {
      var present = function(v) { 
        return v !== null && v !== undefined; 
      };
      return this.select(present);
    },
    
    append: function(ary) {
      var i=0, len = ary.length;
      for (; i < len; i++) { this.push(ary[i]); }
      return this;
    }
    
  };
  
  for (method in ext) {
    if (ext.hasOwnProperty(method)) {
      Array.prototype[method] = ext[method];
    }
  }
  
})();




// Helpers

function symbol_to_proc(obj, key) {
  var fn = class_of(obj[key]) === 'Function';
  return fn ? obj[key]() : obj[key];
}

function call_or_apply(f, x) {
  return (f.length > 1) ? f.apply(f, x) : f(x);
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
    is_fn ? call_or_apply(fn_or_symbol, this[i]) : symbol_to_proc(this[i], fn_or_symbol);
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


