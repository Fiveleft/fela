// project.js
define(
  ['jquery','underscore','backbone','events'],
  function( $, _, Backbone, Events ){



    var ProjectView = Backbone.View.extend({

      initialize : function() {
        console.log( "ProjectView.initialize()  collection:", this.collection  );

        if( !this.collection.length ) {
          this.listenToOnce( this.collection, "sync", this.projectsLoaded );
        }
      },

      projectsLoaded : function( scope ) {
        console.log("ProjectView.projectsLoaded", scope );
      },

      render : function() {
        // console.log( "ProjectView.render() model : ", this.model  );
      }

    });

    return ProjectView;
  });