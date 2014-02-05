/*
 * Gruntfile.js
 * @version 1.0.0
 */

'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-watch" );

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: { 
      "name": 'temple' 
    },
    tag: {
      banner: '/*! <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today(\'yyyy\') %> @prayerslayer | MIT license | github.com/prayerslayer/temple.js */\n',
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: 'lib/<%= project.name %>.js'
    },
    uglify: {
      files: {
        src: ['lib/<%= project.name %>.js'],
        dest: 'dist/<%= project.name %>.min.js'
      },
      options: {
        banner: '<%= tag.banner %>',
        mangle: true
      }
    },
    watch: {
      js: {
        files: 'lib/*',
          tasks: [
            'jshint',
            'uglify'
          ]
      }
    }
  });

  grunt.registerTask('default' , "watch");

};