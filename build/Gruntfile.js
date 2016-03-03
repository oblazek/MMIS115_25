/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' Licensed <%= pkg.license %> */\n',
      
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        unused: 'vars',
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          ModularMVC: true,// 
          debug: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      files: {
        src: ['js/*.js']
      }
    },
    
    concat: {
      options: {
        //banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: '<%= jshint.files.src %>',
        dest: 'tmp/merged.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '../dist/js/<%= pkg.name %>.min.js'
      }
    },
    jsdoc: {
      dist : {
            src: ['js/*.js', 'README.md', 'package.json'],
            options: {
                destination: 'tmp/',
                 template : "node_modules/ink-docstrap/template",
                 configure : "jsdoc.conf.json"
            }
        }
    },
    xmlpoke: {
      contentsrc: {
        options: {
          xpath: '/widget/content/@src',
          value: 'dist/index.html'
        },
        files: {'../config.xml': '../config.xml',
        },
      },
    },
    processhtml: {
      dist: {
        src: 'index.html',
        dest: 'tmp/index_processed.html'
      }
    },
    htmlmin: {
      dist: { // Target
        options: { // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: { // Dictionary of files
          '../dist/index.html': '<%= processhtml.dist.dest %>', // 'destination': 'source'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: '../dist/css',
          ext: '.min.css'
        }]
      }
    },
    // cssmin: {
    //   dist: {
    //     src: 'css/styles.css',
    //     dest: 'tmp/<%= pkg.name %>.min.css'
    //   }
    // },
    copy: {
      DISTbowercomponents: {
        files: [
          {dest: '../dist/js/libs/ModularMVC.min.js', src: 'bower_components/ModularMVC/ModularMVC.min.js'},
          {dest: '../dist/js/libs/jquery.min.js', src: 'bower_components/jquery/jquery.min.js'},
          {dest: '../dist/js/libs/jquery.min.map', src: 'bower_components/jquery/jquery.min.map'},
          {dest: '../dist/css/jquery.mobile-1.4.5.min.css', src: 'bower_components/jquery-mobile-bower/css/jquery.mobile-1.4.5.min.css'},
          {dest: '../dist/js/libs/jquery.mobile-1.4.5.min.js', src: 'bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.5.min.js'},
          {dest: '../dist/js/libs/jquery.mobile-1.4.5.min.map', src: 'bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.5.min.map'},
        ]
      },
      DISTApifiles: {
        files: [{
          cwd: 'js/',
          src: ['*.json'],
          dest: '../dist/js/',
          expand: true
        }, {
          cwd: 'js/images/',
          src: ['*.*'],
          dest: '../dist/js/images/',
          expand: true
        }, {
          cwd: 'screenshots/',
          src: ['*.*'],
          dest: '../screenshots/',
          expand: true
        }, {
          cwd: 'css/',
          src: ['*.png'],
          dest: '../dist/css/',
          expand: true
        }]
      },
      DISTdocfiles: {
        files: [{
          cwd: '<%= jsdoc.dist.options.destination %>/<%= pkg.title || pkg.name %>/<%= pkg.version %>/',
          src: ['**'],
          dest: '../dist/docs/',
          expand: true
        }]
      }
    },
    clean: {
      tmp: ['tmp']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-xmlpoke');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default 'jshint', 'concat', 'uglify', 'cssmin', 'jsdoc', 'copy', 'processhtml', 'htmlmin', 'xmlpoke', 'clean'
  //grunt.registerTask('default', ['jshint', 'xmlpoke']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'jsdoc', 'copy', 'processhtml', 'htmlmin', 'xmlpoke', 'clean']);
};
