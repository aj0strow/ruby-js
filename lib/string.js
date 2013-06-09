(function() {
  
  var ext = {
    
    downcase: String.prototype.toLowerCase,
    
    upcase: String.prototype.toUpperCase,
    
    reverse: function() {
      return this.split('').reverse().join('');
    },
    
    capitalize: function() {
      return this.substr(0, 1).toUpperCase() + this.substr(1).toLowerCase();
    },
    
    scan: function(regexp) {
      var tokens = [];
      var str = this.slice(), prev = '', matches;
      while (str !== prev) {
        prev = str;
        str = prev.replace(regexp, function(fullMatch) {
          matches = Array.prototype.slice.call(arguments, 1, -2);
          tokens.push(matches.length > 0 ? matches : fullMatch);
          return '';
        });
      }
      return tokens;
    },
    
    strip: String.prototype.trim,
    
    gsub: function(regex, fn_val_obj) {
      if (fn_val_obj.class() === Object) {
        var obj = fn_val_obj;
        fn_val_obj = function(match) { return obj[match] || match };
      }
      var regex = new RegExp(regex.toString().slice(1, -1), 'g');
      return this.replace(regex, fn_val_obj);
    }
    
    
  };
  
  for (method in ext) {
    if (ext.hasOwnProperty(method)) {
      String.prototype[method] = ext[method];
    }
  }
})();