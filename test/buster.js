var config = module.exports;

config['My tests'] = {
    rootPath: '../',
    environment: 'node',
    tests: [ 'test/*-test.js' ]
}

buster = require('buster');
assert = buster.assertions.assert;
refute = buster.assertions.refute;