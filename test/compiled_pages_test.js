'use strict';

var grunt = require('grunt');

exports.underscore_pages = {
    setUp: function(done) {
        done();
    },
    basicUnderscoreTemplate: function(test) {
        var actual = grunt.file.read('tmp/underscore/basic_template.html');
        var expected = grunt.file.read('test/expected/basic_template.html');
        test.equal(actual, expected, 'basic template should complile');
        test.done();
    },
    singleUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/single_include.html');
        var expected = grunt.file.read('test/expected/single_include.html');
        test.equal(actual, expected, 'single include template should complile');
        test.done();
    },
    multipleUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/multiple_include.html');
        var expected = grunt.file.read('test/expected/multiple_include.html');
        test.equal(actual, expected, 'multiple include template should complile');
        test.done();
    },
    nestedUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/nested_include.html');
        var expected = grunt.file.read('test/expected/nested_include.html');
        test.equal(actual, expected, 'nested include template should complile');
        test.done();
    },
    specificContextUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/specific_context.html');
        var expected = grunt.file.read('test/expected/specific_context.html');
        test.equal(actual, expected, 'specific context template should complile');
        test.done();
    },
    includedDataUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/include_data.html');
        var expected = grunt.file.read('test/expected/include_data.html');
        test.equal(actual, expected, 'included data template should complile');
        test.done();
    },
    basicHtmlAsUnderscoreTemplate: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/basic_template.html');
        var expected = grunt.file.read('test/expected/basic_template.html');
        test.equal(actual, expected, 'basic template should complile');
        test.done();
    },
    singleHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/single_include.html');
        var expected = grunt.file.read('test/expected/single_include.html');
        test.equal(actual, expected, 'single include template should complile');
        test.done();
    },
    multipleHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/multiple_include.html');
        var expected = grunt.file.read('test/expected/multiple_include.html');
        test.equal(actual, expected, 'multiple include template should complile');
        test.done();
    },
    nestedHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/nested_include.html');
        var expected = grunt.file.read('test/expected/nested_include.html');
        test.equal(actual, expected, 'nested include template should complile');
        test.done();
    },
    specificContextHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/specific_context.html');
        var expected = grunt.file.read('test/expected/specific_context.html');
        test.equal(actual, expected, 'specific context template should complile');
        test.done();
    },
    templatePathUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/underscore/template_path.html');
        var expected = grunt.file.read('test/expected/template_path.html');
        test.equal(actual, expected, 'template path include template should complile');
        test.done();
    },
    templatePathHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/template_path.html');
        var expected = grunt.file.read('test/expected/template_path.html');
        test.equal(actual, expected, 'template path include template should complile');
        test.done();
    },
    includedDataHtmlAsUnderscoreInclude: function(test) {
        var actual = grunt.file.read('tmp/htmlAsUnderscore/include_data.html');
        var expected = grunt.file.read('test/expected/include_data.html');
        test.equal(actual, expected, 'included data template should complile');
        test.done();
    },
    plainDestDirectoryTest: function(test) {
        var actual = grunt.file.read('tmp/destDirectory/test/fixtures/underscore/basic_template.html');
        var expected = grunt.file.read('test/expected/basic_template.html');
        test.equal(actual, expected, 'plain destination directory basic_template should complile');

        actual = grunt.file.read('tmp/destDirectory/test/fixtures/underscore/multiple_include.html');
        expected = grunt.file.read('test/expected/multiple_include.html');
        test.equal(actual, expected, 'plain destination directory multiple_include should complile');
        test.done();
    },
    removeDestDirectoryTest: function(test) {
        var actual = grunt.file.read('tmp/destDirectory/basic_template.html');
        var expected = grunt.file.read('test/expected/basic_template.html');
        test.equal(actual, expected, 'remove destination directory basic_template should complile');

        actual = grunt.file.read('tmp/destDirectory/multiple_include.html');
        expected = grunt.file.read('test/expected/multiple_include.html');
        test.equal(actual, expected, 'remove destination directory multiple_include should complile');
        test.done();
    },
    replaceDestDirectoryTest: function(test) {
        var actual = grunt.file.read('tmp/destDirectory/replacedSourceDirectory/basic_template.html');
        var expected = grunt.file.read('test/expected/basic_template.html');
        test.equal(actual, expected, 'replaced destination directory basic_template should complile');

        actual = grunt.file.read('tmp/destDirectory/replacedSourceDirectory/multiple_include.html');
        expected = grunt.file.read('test/expected/multiple_include.html');
        test.equal(actual, expected, 'replaced destination directory multiple_include should complile');
        test.done();
    },
    otherFilesTest: function(test) {
        var actual = grunt.file.read('tmp/other/main.scss');
        var expected = grunt.file.read('test/expected/main.scss');
        test.equal(actual, expected, 'main.scss should complile');

        actual = grunt.file.read('tmp/other/main.css');
        expected = grunt.file.read('test/expected/main.css');
        test.equal(actual, expected, 'main.scss should complile');
        test.done();
    }
};