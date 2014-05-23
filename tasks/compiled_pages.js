/*
 * grunt-compiled-pages
 * https://github.com/nloding/grunt-compiled-pages
 *
 * Copyright (c) 2014 Nathan Loding
 * Licensed under the MIT license.
 */


/*
 * todo -> can handlebars ever work? require('handlebars').registerHelper(...) did not work
 */

'use strict';

module.exports = function(grunt) {
  var templateContext, options, buildTemplateContext, extensionOf, fs, htmlFor, includeTemplate, _, locateTemplate;
  _ = require("lodash");
  fs = require("fs");
  
  grunt.registerMultiTask('compiled_pages', 'Compile underscore templates into static HTML pages, with support for including templates.', function() {
    var context, dest, format, source, _this;

    // skip the task-level context declaration
    if (this.target === 'context') { return; }

    _this = this;
    options = this.options();

    if (options.replaceSourceDirectory && !options.replaceSourceDirectory.match(/\/$/)) {
      options.replaceSourceDirectory = options.replaceSourceDirectory + '/';
    }

    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(src) {
        format = (extensionOf(src) || "html").toLowerCase();
        dest = filePair.dest;

        // if it's a directory (doesn't contain period)
        // todo -> better logic here?
        if (!filePair.dest.match(/\./)) {
          dest = filePair.dest;
          if (!dest.match(/\/$/)) {
            dest = dest + '/';
          }

          if (options.removeSourceDirectory) {
            dest = dest + src.replace(/.+\//, '').replace(/\.us$/, '.html');
          } else if (options.replaceSourceDirectory) {
            dest = dest + src.replace(/.+\//, options.replaceSourceDirectory).replace(/\.us$/, '.html');
          } else {
            dest = dest + src.replace(/\.us$/, '.html');
          }
        }

        source = grunt.file.read(src);
        context = buildTemplateContext(_this);
        grunt.file.write(dest, htmlFor(format, source, context));

        grunt.log.writeln(dest + ' generated from ' + src);
      });
    });
  });

  includeTemplate = function(filename, data) {
    var html, includeSource, format, template;
    template = locateTemplate(filename);
    html = '';

    if (template) {
      try {
        format = (extensionOf(filename) || "html").toLowerCase();
        includeSource = grunt.file.read(template);
        data = _.extend(templateContext, data);
        html = htmlFor('us', includeSource, data);
      } catch (error) {
        grunt.log.writeln("Unable to process include for " + filename);
      }
    } else {
      grunt.log.writeln("Unable to locate the include file " + filename);
    }

    return html;
  };

  locateTemplate = function(filename) {
    if (grunt.file.exists(filename)) {
      return filename;
    }

    var tpl;

    options.templatePath.forEach(function(tplPath) {
      if (!(/\/$/.test(tplPath))) {
        tplPath += '/';
      }

      var fullTemplate = tplPath + filename;
      if (grunt.file.exists(fullTemplate)) {
        tpl = fullTemplate;
      }
    });
    
    return tpl;
  };

  extensionOf = function(fileName) {
    return _(fileName.match(/[^.]*$/)).last();
  };

  htmlFor = function(format, source, context) {
    return _(source).template()(context);
  };

  buildTemplateContext = function(task) {
    var data = {};
    if (task.data.context) {
      data = _.extend(task.data.context, options.context);
    } else if (options.context) {
      data = options.context;
    }

    templateContext = _.extend(data, {
                                include: includeTemplate
                              });
    return templateContext;
  };

};
