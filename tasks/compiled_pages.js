/*
 * grunt-compiled-pages
 * https://github.com/nloding/grunt-compiled-pages
 *
 * Copyright (c) 2014 Nathan Loding
 * Licensed under the MIT license.
 */


/*
 * todo list:
 * todo -> allow for and test include dir array
 * todo -> can handlebars ever work? require('handlebars').registerHelper(...) did not work
 */

'use strict';

module.exports = function(grunt) {
  var templateContext, options, buildTemplateContext, extensionOf, fs, htmlFor, includeTemplate, _;
  _ = require("lodash");
  fs = require("fs");
  
  grunt.registerMultiTask('compiled_pages', 'Compile underscore templates into static HTML pages, with support for including templates.', function() {
    var context, dest, format, source, _this;

    // skip the task-level context declaration
    if (this.target === 'context') { return; }

    _this = this;
    options = this.options();

    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(src) {
        format = (extensionOf(src) || "html").toLowerCase();
        dest = filePair.dest.match(/\.html$/) ? filePair.dest : [filePair.dest.replace(/\/$/, ''), src.replace(/.*\//, '').replace(/\..+$/, '.html')].join('/');
        source = grunt.file.read(src);
        context = buildTemplateContext(_this);
        grunt.file.write(dest, htmlFor(format, source, context));

        grunt.log.writeln(dest + ' generated from ' + src);
      });
    });
  });

  includeTemplate = function(fileName, data) {
    var error, html, includeSource, format;
    html = '';
    if (grunt.file.exists(fileName)) {
      try {
        format = (extensionOf(fileName) || "html").toLowerCase();
        includeSource = grunt.file.read(fileName);
        data = _.extend(templateContext, data);
        html = htmlFor('us', includeSource, data);
      } catch (_error) {
        error = _error;
        grunt.log.writeln("Unable to process include for " + fileName);
      }
    } else {
      grunt.log.writeln(fileName + " not found");
    }
    return html;
  };

  extensionOf = function(fileName) {
    return _(fileName.match(/[^.]*$/)).last();
  };

  htmlFor = function(format, source, context) {
    return _(source).template()(context);
  };

  buildTemplateContext = function(task) {
    var data = _.extend(task.data.context, options.context);
    templateContext = _.extend(data, {
                                include: includeTemplate
                              });
    return templateContext;
  };

};
