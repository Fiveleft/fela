
module.exports = function(grunt) {

  grunt.initConfig({

    bower: grunt.file.readJSON('./.bowerrc'),

    // @see:
    env : {
      dev: {
        NODE_ENV : 'development',
        PORT : 3000,
      },
      stage: {
        NODE_ENV : 'stage',
        PORT : 3001,
      },
      production: {
        NODE_ENV : 'production',
        PORT : 3002,
      },
      prodtest: {
        NODE_ENV : 'production',
        PORT : 3003,
      },
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
          out: 'public/js/init-min.js'
        }
      }
    },

    uglify: {
      compile : {
        files: {
          'public/js/require.min.js': ['public/js/vendor/requirejs/require.js'],
          'public/js/modernizr.min.js': ['public/js/modernizr.custom.js']
        }
      }
    },

    // CSS TASKS ===============================================================
    // process the sass files and compass framework to style.css
    compass: {
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
          'public/css/main.min.css': 'public/css/main.css'
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
        script: './bin/dev',
        options: {
          nodeArgs: ['--debug'],
          ext: 'hbs,js',
          ignore: [
            'node_modules/**',
            'public/js/**',
            'views/templates/**',
          ],
        }
      },
      stage: {
        script: './bin/stage',
        options: {
          nodeArgs: ['--debug'],
          ext: 'hbs,js',
          ignore: [
            'node_modules/**',
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
            'public/js/**',
            'views/templates/**',
          ],
        }
      }
    },


    // PRODUCTION TASKS ===============================================================
    // gzip assets 1-to-1 for production 
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'public/js',
        src: ['*.js'],
        dest: 'bin/temp/'
      } 
    },


    // GIT Deployment Tasks
    gitpush: {
      stage: {
        options: {
          verbose: true,
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
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-nodemon');






  // Default task
  grunt.registerTask('default', [
    'env:dev',
    'handlebars',
    'concurrent:dev'
  ]);

  grunt.registerTask('stage-test', [
    'env:stage',
    'nodemon:stage'
  ]);

  grunt.registerTask('stage-prepare', [
    'env:stage',
  ]);

  grunt.registerTask('stage-push', [
    'env:stage',
    'gitpush:stage'
  ]);

  grunt.registerTask('prod-prepare', [
    'compass:dev', 
  ]);

  grunt.registerTask('prod-build', [
    'env:production',
    'handlebars',
    'cssmin',
    'uglify',
    'requirejs'
  ]);

  grunt.registerTask('prod-test', [
    'env:production',
    'prod-prepare',
    'prod-build',
    'nodemon:production'
  ]);

  grunt.registerTask('prod-push', [
    'prod-prepare',
    'gitpush:production',
  ]);


};
