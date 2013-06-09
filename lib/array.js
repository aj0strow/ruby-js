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
    },
    
    each: function(fn, object) {
      var i=0, len = this.length;
      for(; i < len; i++) {
        fn(this[i], i, object);
      }
      return this;
    }
    
  };
  
  for (method in ext) {
    if (ext.hasOwnProperty(method)) {
      Array.prototype[method] = ext[method];
    }
  }
  
})();