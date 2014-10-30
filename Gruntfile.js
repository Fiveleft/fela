module.exports = function(grunt) {

  grunt.initConfig({

    bowerInstall: {
      target: {
        src: 'views/index.hbs' // point to your HTML file.
      }
    },

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['src/js/**/*.js'] 
    },

    // take all the js files and minify them into app.min.js
    uglify: {
      build: {
        files: {
          'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
        }
      }
    },

    // CSS TASKS ===============================================================
    // process the sass files and compass framework to style.css
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'app/public/css/scss',
          cssDir: 'app/dist/css',
          outputStyle: 'compact',
          lineComments: 'true'
        }
      },
      dev: {
        options: {
          sassDir: 'app/public/css/scss',
          cssDir: 'app/public/css'
        }
      }
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'app/dist/css/main.min.css': 'app/dist/css/style.css'
        }
      }
    },

    // COOL TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['src/scss/**/*.scss'],
        tasks: ['compass:dev']
      }
      // js: {
      //   files: ['src/js/**/*.js'],
      //   tasks: ['jshint', 'uglify']
      // }
    },

    concurrent: {
      dev: {
        // tasks: ['nodemon', 'node-inspector', 'watch'],
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    // configure nodemon
    nodemon: {
      dev: {
        script: './bin/www',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,hbs'
        }
      }
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['concurrent']);
  // grunt.registerTask('compass', ['compass:dev']);

};
