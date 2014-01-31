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
        src: ['theme/assets/_base.js', 'theme/assets/bootstrapify-option-selection.js']
      }
    },
/*
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }
*/
    sass: {
      dist: {
        files: {
          'theme/assets/_base.css': 'dist/styles.scss',
          'theme/assets/checkout.css.liquid': 'dist/checkout.scss'
        }
      }
    },
    copy: {
      main: {
        files: [
          // grab bootstraps js files
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
          }
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
/*   grunt.loadNpmTasks('grunt-contrib-watch'); */
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'copy', 'sass']);

};
