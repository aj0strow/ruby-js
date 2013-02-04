var toString = Object.prototype.toString;

/*
Object.prototype.is_a = function(type) {
  return '[object ' + type + ']' === toString.call(this);
}
*/

Object.prototype.class = function() {
  var to_s = toString.call(this);
  return to_s.slice(8, to_s.length - 1);
}
