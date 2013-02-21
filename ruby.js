var toString = Object.prototype.toString;

class_of = function(obj) {
  var to_s = toString.call(obj);
  var klass = to_s.slice(8, to_s.length - 1);
  
  if (klass === 'Object' && obj.class !== undefined) {
    return obj.class;
  } else {
    return klass;
  }
}

require('./lib/object');
require('./lib/string');
require('./lib/enumerator');
var enumerable = require('./lib/enumerable');
require('./lib/array');

function extend_class(klass, mixin, force_flag) {
  for (var key in mixin.prototype) {
    if (force_flag || klass.prototype[key] === undefined) {
      klass.prototype[key] = mixin.prototype[key];
    }
  }
}

extend_class(Array, enumerable.Enumerable, true);


module.exports.extend_class = extend_class;