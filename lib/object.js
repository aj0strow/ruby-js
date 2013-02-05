RObject = function() {};

RObject.new = function(obj) {
  if (arguments.length === 0) {
    return new RObject();
  } else {
    var klass = class_of(obj);
    if (klass == 'Array' || klass == 'String' || klass == 'Function') {
      return obj;
    } else if (klass == 'Number') {
      return new Number(obj);
    } else {
      return obj;
    }
  }
}

/*
Object.prototype.is_a = function(type) {
  return '[object ' + type + ']' === toString.call(this);
}
*/


Object.prototype.methods = function() {
  return ['class', 'methods'];
}
