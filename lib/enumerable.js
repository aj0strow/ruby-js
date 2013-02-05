// Helpers

function symbol_to_proc(obj, key) {
  var fn = class_of(obj[key]) === 'Function';
  return fn ? obj[key]() : obj[key];
}

// enumerable.js

function Enumerable() {};

Enumerable.prototype = {
  
  all: function(fn) {
    if (arguments.length === 0) {
      fn = function(x) { return x; };
    }
    for (var i=0; i<this.length; i++) {
      if( !fn( this[i] ) ) return false;
    }
    return true;
  },
  
  any: function(fn) {
    if (arguments.length === 0) {
      fn = function(x) { return x; };
    }
    for (var i=0; i<this.length; i++) {
      if( fn( this[i] )  ) return true;
    }
    return false;
  },
  
  map: function(fn) {
    
    if (arguments.length === 0) {
      var en = this;
      return Enumerator.new(this.length, function(i) { return en[i]; });
    }
    else if ( !(class_of(fn) === 'Function') ) {
      return this.collect(fn);
    }
    var ary = [];
    for(var i=0; i<this.length; i++) {
      ary.push( fn(this[i]) );
    }
    return ary;
  },

  collect: function(key) {
    
    if (arguments.length === 0) {
      var en = this;
      return Enumerator.new(this.length, function(i) { return en[i]; });
    } 
    else if (class_of(key) === 'Function') {
      return this.map(key);
    }
    var ary = [];
    for(var i=0; i<this.length; i++) {
      ary.push( symbol_to_proc(this[i], key) );
    }
    return ary;
  }
  
  
}

exports.Enumerable = Enumerable;