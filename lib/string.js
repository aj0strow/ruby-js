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
    
    clear: function() {
      return '';
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
    }
    
    
  };
  
  for (method in ext) {
    if (ext.hasOwnProperty(method)) {
      String.prototype[method] = ext[method];
    }
  }
})();