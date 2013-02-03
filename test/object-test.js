// Tests object.js

var buster = require('buster');
var ary = require('../ruby');

buster.testCase('Object', {
    'is_a': function() {
      assert({}.is_a('Object'));
      assert([].is_a('Array'));
      assert((function() {}).is_a('Function'));
    },
    'class': function() {
      assert.equal('Object', {}.class());
      assert.equal('Array', [].class());
      assert.equal('Number', Object(5).class())
    }
});

