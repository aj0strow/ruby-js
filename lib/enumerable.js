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
  
  flat_map: function(fn) {
    if (arguments.length === 0) {
      return Enumerator.new(this);
    }
    var ary = [];
    for (var i=0; i<this.length; i++) {
      if ( Object(this[i]).flat_map !== undefined ) {
        ary.append( this[i].flat_map(fn) );
      } else {
        ary.push( fn(this[i]) );
      }
    }
    return ary;
  },
  
  collect_concat: function(fn) {
    return this.flat_map(fn);
  },
  
  map: function(fn) {
    
    if (arguments.length === 0) {
      return Enumerator.new(this);
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
      return Enumerator.new(this);
    } 
    else if (class_of(key) === 'Function') {
      return this.map(key);
    }
    var ary = [];
    for (var i=0; i<this.length; i++) {
      ary.push( symbol_to_proc(this[i], key) );
    }
    return ary;
  },
  
  count: function(val_or_fn) {
    if (arguments.length === 1) {
      var fn = class_of(val_or_fn) === 'Function';
      var count = 0;
      for (var i=0; i<this.length; i++) {
        if (fn) {
          if( val_or_fn(this[i]) ) count++;
        } else { 
          if (val_or_fn === this[i]) count++;
        }
      }
      return count;
    }
    return this.length;
  },
  
  detect: function(fn) {
    if (arguments.length === 0) {
      fn = function(x) { return x !== null && x !== undefined; };
    }
    for (var i=0; i<this.length; i++) {
      if ( fn(this[i]) ) return this[i];
    }
    return null;
  },
  
  each_cons: function(amount, fn) {
    var end_index = this.length - amount + 1;
    if (arguments.length === 1) {
      var a = this;
      var fnctn = function(i) { return a.slice(i, i + amount); }
      return Enumerator.new(end_index, fnctn);
    }
    for (var i=0; i<end_index; i++) {
      fn( this.slice(i, i + amount) );
    }
    return null;
  },
  
  each_slice: function(amount, fn) {
    var end_index = Math.ceil( this.length / (amount * 1.0) );
    if (arguments.length === 1) {
      var a = this;
      var fnctn = function(i) { return a.slice(i * amount, i * amount + amount) };
      return Enumerator.new(end_index, fnctn);
    }
    for (var i=0; i<end_index; i++) {
      fn( this.slice(i * amount, i * amount + amount) );
    }
    return null;
  }
  
  
  
  
  
  
  
}

exports.Enumerable = Enumerable;