/*
 * grunt-compiled-pages
 * https://github.com/nloding/grunt-compiled-pages
 *
 * Copyright (c) 2014 Nathan Loding
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    compiled_pages: {
      options: {
        htmlAsHandlebars: false,
        context: {
          css: 'app/styles.css',
          js: 'app/scripts.js'
        }
      },
      htmlAsUnderscoreTests: {
        context: {
          htmlAsUnderscoreTestsSpecificContext: "test specific context"
        },
        files: {
          'tmp/htmlAsUnderscore/basic_template.html': ['test/fixtures/htmlAsUnderscore/basic_template.html'],
          'tmp/htmlAsUnderscore/single_include.html': ['test/fixtures/htmlAsUnderscore/single_include.html'],
          'tmp/htmlAsUnderscore/multiple_include.html': ['test/fixtures/htmlAsUnderscore/multiple_include.html'],
          'tmp/htmlAsUnderscore/nested_include.html': ['test/fixtures/htmlAsUnderscore/nested_include.html'],
          'tmp/htmlAsUnderscore/specific_context.html': ['test/fixtures/htmlAsUnderscore/specific_context.html']
        }
      },
      underscoreTests: {
        context: {
          underscoreTestsSpecificContext: "test specific context"
        },
        files: {
          'tmp/underscore/basic_template.html': ['test/fixtures/underscore/basic_template.us'],
          'tmp/underscore/single_include.html': ['test/fixtures/underscore/single_include.us'],
          'tmp/underscore/multiple_include.html': ['test/fixtures/underscore/multiple_include.us'],
          'tmp/underscore/nested_include.html': ['test/fixtures/underscore/nested_include.us'],
          'tmp/underscore/specific_context.html': ['test/fixtures/underscore/specific_context.us']
        }
      },
      templatePathTests: {
        options: {
          templatePath: ['test/fixtures/includes']
        },
        files: {
          'tmp/underscore/template_path.html': ['test/fixtures/underscore/template_path.us'],
          'tmp/htmlAsUnderscore/template_path.html': ['test/fixtures/htmlAsUnderscore/template_path.html']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'compiled_pages', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
