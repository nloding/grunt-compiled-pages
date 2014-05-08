/*
 * grunt-compiled-pages
 * https://github.com/nloding/grunt-compiled-pages
 *
 * Copyright (c) 2014 Nathan Loding
 * Licensed under the MIT license.
 */


/*
 * todo list:
 * todo -> allow for and test global context
 * todo -> allow for and test include dir array
 * todo -> allow for and test setting hbs as default for html
 */

'use strict';

module.exports = function(grunt) {
  var templateContext, options, buildTemplateContext, extensionOf, fs, htmlFor, includeTemplate, locateHandlebars, _;
  _ = require("lodash");
  fs = require("fs");
  
  grunt.registerMultiTask('compiled_pages', 'Compile underscore/handlebars templates into static HTML pages, with support for including templates.', function() {
    var context, dest, format, source, _this;

    // skip the task-level context declaration
    if (this.target === 'context') { return; }

    _this = this;
    options = this.options();

    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(src) {
        format = (extensionOf(src) || "html").toLowerCase();
        dest = filePair.dest.match(/\.html$/) ? filePair.dest : [filePair.dest.replace(/\/$/, ''), src.replace(/.*\//, '').replace(/\..+$/, '.html')].join('/');

        if (format === "html") {
          format = options.htmlAsHandlebars ? 'hbs' : 'us';
        }

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

        if (format === 'html') {
          format = options.htmlAsHandlebars ? 'hbs' : 'us';
        }

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
    if (format === "underscore" || format === "us" || format === "jst") {
      return _(source).template()(context);
    } else if (format === "handlebar" || format === "hb" || format === "hbs" || format === "handlebars") {
      return locateHandlebars().compile(source)(context);
    } else {
      return "";
    }
  };

  locateHandlebars = function() {
    var handlebarsPath;
    handlebarsPath = process.cwd() + '/node_modules/handlebars';
    if (fs.existsSync(handlebarsPath)) {
      return require(handlebarsPath);
    } else {
      grunt.log.writeln("NOTE: please add the `handlebars` module to your package.json, as Lineman doesn't include\nit directly. Attempting to Handlebars load naively (this may blow up). Also be sure to\nadd the Handlebars runtime to your `vendor/js` directory (http://handlebarsjs.com)");
      return require("handlebars");
    }
  };

  buildTemplateContext = function(task) {
    var data = _.extend(task.data.context, options.context);
    templateContext = _.extend(data, {
                                include: includeTemplate
                              });
    return templateContext;
  };

};
