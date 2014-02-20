/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          document: true,
          window: true,
          console: true,
          alert: true,
          Image: true,
          $: true,
          jQuery: true,
          Shopify: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      assets: {
        src: ['dist/js/*.js']
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'theme/assets/bootstrapify-option-selection.min.js': ['dist/js/bootstrapify-option-selection.js'],
        }
      }
    },
    concat: {
      dist: {
        src: ['dist/js/jquery.bootstrapify-dropdowns.js', 'dist/js/base.js'],
        dest: 'theme/assets/_base.js',
      },
    },
    sass: {
      dist: {
        files: {
          'theme/assets/_base.css': 'dist/scss/styles.scss',
          'theme/assets/checkout.css.liquid': 'dist/scss/checkout.scss'
        }
      }
    },
    copy: {
      main: {
        files: [
          // grab js files from bower
          {
            expand: true,
            cwd: 'bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap/',
            src: '*.js',
            dest: 'theme/assets/'
          },
          {
            expand: true,
            cwd: 'bower_components/typeahead.js/dist/',
            src: 'typeahead.js',
            dest: 'theme/assets/'
          },
          {
            expand: true,
            cwd: 'bower_components/jquery/dist/',
            src: 'jquery.min.js',
            dest: 'theme/assets/'
          }
        ]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      jshint: {
        files: '<%= jshint.assets.src %>',
        tasks: ['jshint:assets']
      },
      uglify: {
        files: 'dist/js/bootstrapify-option-selection.js',
        tasks: ['uglify']
      },
      concat: {
        files: '<%= concat.dist.src %>',
        tasks: ['concat']
      },
      sass: {
        files: 'dist/scss/*.scss',
        tasks: ['sass']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify', 'copy', 'concat', 'sass']);

};
