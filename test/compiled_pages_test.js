'use strict';

var grunt = require('grunt');

exports.underscore_pages = {
    setUp: function(done) {
        done();
    },
    basicUnderscoreTemplate: function(test) {
        var actual = grunt.file.read('tmp/basic_underscore_template.html');
        var expected = grunt.file.read('test/expected/basic_underscore_template.html');
        test.equal(actual, expected, 'basic template should complile');
        test.done();
    },
    singleUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/single_underscore_include.html');
        var expected = grunt.file.read('test/expected/single_underscore_include.html');
        test.equal(actual, expected, 'single include template should complile');
        test.done();
    },
    multipleUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/multiple_underscore_include.html');
        var expected = grunt.file.read('test/expected/multiple_underscore_include.html');
        test.equal(actual, expected, 'multiple include template should complile');
        test.done();
    },
    nestedUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/nested_underscore_include.html');
        var expected = grunt.file.read('test/expected/nested_underscore_include.html');
        test.equal(actual, expected, 'nested include template should complile');
        test.done();
    },
};