'use strict';

var grunt = require('grunt');

exports.underscore_pages = {
    setUp: function(done) {
        done();
    },
    basicUnderscoreTemplate: function(test) {
        var actual = grunt.file.read('tmp/underscore/basic_template.html');
        var expected = grunt.file.read('test/expected/underscore/basic_template.html');
        test.equal(actual, expected, 'basic template should complile');
        test.done();
    },
    singleUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/single_include.html');
        var expected = grunt.file.read('test/expected/underscore/single_include.html');
        test.equal(actual, expected, 'single include template should complile');
        test.done();
    },
    multipleUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/multiple_include.html');
        var expected = grunt.file.read('test/expected/underscore/multiple_include.html');
        test.equal(actual, expected, 'multiple include template should complile');
        test.done();
    },
    nestedUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/nested_include.html');
        var expected = grunt.file.read('test/expected/underscore/nested_include.html');
        test.equal(actual, expected, 'nested include template should complile');
        test.done();
    },
    specificContextUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/specific_context.html');
        var expected = grunt.file.read('test/expected/underscore/specific_context.html');
        test.equal(actual, expected, 'specific context template should complile');
        test.done();
    },
    basicHtmlAsUnderscoreTemplate: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/basic_template.html');
        var expected = grunt.file.read('test/expected/underscore/basic_template.html');
        test.equal(actual, expected, 'basic template should complile');
        test.done();
    },
    singleHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/single_include.html');
        var expected = grunt.file.read('test/expected/underscore/single_include.html');
        test.equal(actual, expected, 'single include template should complile');
        test.done();
    },
    multipleHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/multiple_include.html');
        var expected = grunt.file.read('test/expected/underscore/multiple_include.html');
        test.equal(actual, expected, 'multiple include template should complile');
        test.done();
    },
    nestedHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/nested_include.html');
        var expected = grunt.file.read('test/expected/underscore/nested_include.html');
        test.equal(actual, expected, 'nested include template should complile');
        test.done();
    },
    specificContextHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/specific_context.html');
        var expected = grunt.file.read('test/expected/underscore/specific_context.html');
        test.equal(actual, expected, 'specific context template should complile');
        test.done();
    }
};