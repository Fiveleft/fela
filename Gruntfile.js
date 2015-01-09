
module.exports = function(grunt) {

  grunt.initConfig({

    bower: grunt.file.readJSON('./.bowerrc'),

    // @see:
    env : {
      dev: {
        NODE_ENV : 'development',
      },
      production: {
        NODE_ENV : 'production',
      }
    },

    // @see: https://www.npmjs.com/package/grunt-sync
    sync: {
      main: {
        files: [{
          cwd: 'public',
          src: ['images/**', 'favicon.ico'],
          dest: 'public-prod/'
        }],
        verbose: true, // Display log messages when copying files
        ignoreInDest: ['**/*.js', '**/*.css'],
      }
    },

    // Handlebars Templates
    // @see http://danburzo.ro/grunt/chapters/handlebars/
    handlebars: {
      all : { 
        options : {
          amd: true,
          processName: function(filePath) {
            return filePath.replace(/^views\/templates\//, '').replace(/\.hbs$/, '');
          }
        },
        files : {
          "public/js/app/views/templates.js" : ["views/templates/**/*.hbs"]
        }
      }
    },


    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: [
        'public/js/*.js',
        'public/js/app/**/*.js',
        'public/js/fiveleft/**/*.js',
        '!public/js/app/views/templates.js'
      ],
      options: {
        'expr' : true,
        'sub' : true
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'public/js',
          mainConfigFile: 'public/js/init.js',
          name: 'init',
          out: 'public-prod/js/init.js'
        }
      }
    },

    uglify: {
      compile : {
        files: {
          'public-prod/js/require.min.js': ['public/js/vendor/requirejs/require.js'],
          'public-prod/js/modernizr.min.js': ['public/js/modernizr.custom.js']
        }
      }
    },

    // CSS TASKS ===============================================================
    // process the sass files and compass framework to style.css
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'public/css/scss',
          cssDir: 'public-prod/css',
          outputStyle: 'compact'
        }
      },
      dev: {
        options: {
          sassDir: 'public/css/scss',
          cssDir: 'public/css'
        }
      }
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public-prod/css/main.min.css': 'public/css/main.css'
        }
      }
    },

    // DEV TASKS ===============================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['public/css/scss/**/*.scss'],
        tasks: ['compass:dev']
      },
      templates: {
        files: ['views/templates/**/*.hbs'],
        tasks: ['handlebars']
      },
      // js: {
      //   files: ['public/js/**/*.js'],
      //   tasks: ['jshint']
      // }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        script: './bin/www',
        options: {
          nodeArgs: ['--debug'],
          ext: 'hbs,js',
          ignore: [
            'node_modules/**',
            'public-dist/**',
            'public/js/**',
            'views/templates/**',
          ],
        }
      },
      production: {
        script: './bin/www',
        options: {
          // ext: 'hbs,js',
          ignore: [
            'node_modules/**',
            'public-dist/**',
            'public/js/**',
            'views/templates/**',
          ],
        }
      }
    },


    // GIT Deployment Tasks
    gitpush: {
      stage: {
        options: {
          remote: "stage"
        }
      },
      production: {
        options: {
          verbose: true,
          remote: "production"
        }
      }
    },

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-sync');

  // Load gem-dependent tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-nodemon');






  // Default task
  grunt.registerTask('default', [
    'env:dev',
    'handlebars',
    'concurrent:dev'
  ]);

  grunt.registerTask('prod-prepare', [
    'compass:dev', 
  ]);

  grunt.registerTask('prod-build', [
    'handlebars',
    'cssmin',
    'uglify',
    'requirejs', 
    'sync',
  ]);

  grunt.registerTask('prod-test', [
    'env:production',
    'prod-prepare',
    'prod',
    'nodemon:production'
  ]);

  grunt.registerTask('prod', [
    'prod-prepare',
    'gitpush:production',
  ]);


};
