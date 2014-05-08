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
          
        },
        files: {
          'tmp/underscore/basic_template.html': ['test/fixtures/underscore/basic_template.html'],
          'tmp/underscore/single_include.html': ['test/fixtures/underscore/single_include.html'],
          'tmp/underscore/multiple_include.html': ['test/fixtures/underscore/multiple_include.html'],
          'tmp/underscore/nested_include.html': ['test/fixtures/underscore/nested_include.html'],
          'tmp/underscore/specific_context.html': ['text/fixtures/underscore/specific_context.html']
        }
      },
      underscoreTests: {
        context: {
          underscoreTestsSpecificContext: "underscore tests specific context"
        },
        files: {
          'tmp/underscore/basic_template.html': ['test/fixtures/underscore/basic_template.us'],
          'tmp/underscore/single_include.html': ['test/fixtures/underscore/single_include.us'],
          'tmp/underscore/multiple_include.html': ['test/fixtures/underscore/multiple_include.us'],
          'tmp/underscore/nested_include.html': ['test/fixtures/underscore/nested_include.us'],
          'tmp/underscore/specific_context.html': ['test/fixtures/underscore/specific_context.us']
        }
      },
      handlebarsTests: {

      },
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
