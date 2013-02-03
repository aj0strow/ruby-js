// Tests array.js

var buster = require('buster');
var ruby = require('../ruby');

buster.testCase('Array testing', {
    '::new': function () {
      assert(Array.new() === []);
    }
});