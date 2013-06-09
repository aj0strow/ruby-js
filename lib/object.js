(function() {
  
  var root;
  if (typeof window !== 'undefined') {
    root = window;
  } else if (typeof global !== 'undefined') {
    root = global;
  } else {
    root = {};
  }
  
  var toString = Object.prototype.toString;
  
  var ext = {
    
    class: function() {
      return root[toString.call(this).slice(8, -1)];
    }
    
  };
  
  for (method in ext) {
    if (ext.hasOwnProperty(method)) {
      Object.prototype[method] = ext[method];
    }
  }  
  
})();
