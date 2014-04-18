module.exports = function(grunt) {

  // files to be minified and combined
  var path = require("path");

  // this is where all the grunt configs will go
  grunt.initConfig({
    // read the package.json
    // pkg will contain a reference to out pakage.json file use of which we will see later
    pkg: grunt.file.readJSON('package.json')

    ,compass : {
      options : {
        sassDir: "public/css/scss"
        ,cssDir: "public/css"
        ,imagesDir: "public/img"
      }
      ,dev : {
        outputStyle: "expanded"
      }
      ,dist : {
        outputStyle: "compressed"
      }
    }
    ,express : {
      options : {
        node_env : "development"
        ,script : "app.js"
        ,port : process.env.PORT || 3000 
      }
      ,stage : {
        node_env : "stage"
      }
      ,dev : {
        node_env : "development"
        ,script : "app.js"
        ,port : process.env.PORT || 3000 
      }
    }
    ,handlebars : {
      // @see http://danburzo.ro/grunt/chapters/handlebars/
      all : { 
        options : {
          namespace : "fiveleft.templates"
          ,processName: function(filePath) {
            return filePath.replace(/^views\/templates\//, '').replace(/\.hbs$/, '');
          }
        }
        ,files : {
          "public/js/fiveleft/view/templates.js" : ["views/templates/**/*.hbs"]
        }
      }
    }
    ,watch: {
      gruntFile: {
        files: [ 
          'Gruntfile.js' 
        ]
        ,options: {
          reload: true
        }
        ,tasks: ["watch"]
      }
      ,sass: {
        files: [
          "**/*.scss"
        ]
        ,tasks: ["compass:dev"]
      }
      ,templates : {
        files: [
          "views/templates/**/*.hbs"
        ]
        ,tasks: ["handlebars"]
      }
      ,express: {
        option : {
          background:false
          ,serverreload : true
        }
        ,files:  [ 
          "app.js"
          ,"config.json"
          ,"views/*.hbs"
          ,"views/layouts/*"
          ,"views/partials/*"
          ,"routes/**/*.js"
        ]
        ,tasks: ['express:dev:stop', 'express:dev', 'watch']
      }
    }

    // configuration for the cssmin task
    // note that this syntax and options can found on npm page of any grunt plugin/task
    // ,cssmin: {
    //   // options for css min task
    //   options:{
    //     // banner to be put on the top of the minified file using package name and todays date
    //     // note that we are reading our project name using pkg.name i.e name of our project
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   combine: {
    //     // options for combining files
    //     // we have defined cssFiles variable to hold our file names at the top
    //     files: {
    //       // here key part is output file which will our <package name>.min.css
    //       // value part is set of input files which will be combined/minified
    //       'public/css/<%= pkg.name %>.min.css': cssFiles
    //     }
    //   }
    // }

  }); // end of configuring the grunt task

  
  // grunt.loadTasks('tasks');

  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-express-server');

  // Default task(s).
  grunt.registerTask('default', ["compass:dev", "handlebars", "express:dev", "watch"]);


};