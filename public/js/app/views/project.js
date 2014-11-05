// project.js
define(
  ['jquery','underscore','backbone','events','templates'],
  function( $, _, Backbone, Events, templates ){



    var ProjectView = Backbone.View.extend({

      initialize : function() {
        console.log("ProjctView.initialize()", this.model.attributes.content );
      },

      render : function() {
        var html = templates["project-item"](this.model.attributes);
        this.$el.html( html );
        return this;
      }

    });

    return ProjectView;
  });