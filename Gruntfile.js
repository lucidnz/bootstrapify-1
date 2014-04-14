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
          'theme/assets/bootstrapify-option-selection.min.js': 'dist/js/bootstrapify-option-selection.js',
          'theme/assets/jquery.instagram.min.js': ['bower_components/jquery-instagram/dist/instagram.js', 'dist/js/jquery.instagram.js']
        }
      }
    },
    concat: {
      dist: {
        src: ['dist/js/jquery.bootstrapify-dropdowns.js', 'dist/js/base.js'],
        dest: 'theme/assets/_base.js'
      },
      styles: {
        src: [
          'dist/scss/pre_styles.scss.liquid',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_variables.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_hide-text.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_opacity.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_image.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_labels.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_reset-filter.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_resize.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_responsive-visibility.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_size.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_tab-focus.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_text-emphasis.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_text-overflow.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_vendor-prefixes.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_alerts.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_buttons.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_panels.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_pagination.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_list-group.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_nav-divider.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_forms.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_progress-bar.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_table-row.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_background-variant.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_border-radius.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_gradients.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_clearfix.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_center-block.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_nav-vertical-align.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_grid-framework.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/mixins/_grid.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_normalize.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_print.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_glyphicons.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_scaffolding.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_type.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_code.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_grid.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_tables.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_forms.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_buttons.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_component-animations.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_dropdowns.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_button-groups.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_input-groups.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_navs.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_navbar.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_breadcrumbs.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_pagination.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_pager.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_labels.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_badges.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_jumbotron.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_thumbnails.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_alerts.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_progress-bars.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_media.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_list-group.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_panels.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_responsive-embed.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_wells.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_close.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_modals.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_tooltip.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_popovers.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_carousel.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_utilities.scss',
          'bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap/_responsive-utilities.scss',
          'dist/scss/post_styles.scss.liquid',
          'dist/scss/settings.scss.liquid'
        ],
        dest: 'theme/assets/_base.scss.liquid'
      }
    },
    sass: {
      dist: {
        files: {
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
            src: 'jquery.min.*',
            dest: 'theme/assets/'
          },
          // grab required respond js and cross-domain files from bower
          {
            expand: true,
            cwd: 'bower_components/respond/dest/',
            src: 'respond.min.js',
            dest: 'theme/assets/'
          },
          {
            expand: true,
            cwd: 'bower_components/respond/cross-domain/',
            src: 'respond-proxy.html',
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
        files: 'dist/js/*.js',
        tasks: ['uglify']
      },
      concat: {
        files: ['dist/js/*.js','dist/scss/*.scss*'],
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
