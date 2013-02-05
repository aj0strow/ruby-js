require('../ruby');

var a = ['a', 'b', { length: function() { return 1; } }];

console.log(a.map('length'));

