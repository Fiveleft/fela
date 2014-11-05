// partner.js
define(
  ['jquery', 'templates', 'backbone', 'events'],
  function( $, templates, Backbone, Events ){

    var ProjectGridItemView = Backbone.View.extend({
      
      className: "project-grid-item",
      
      render: function() {
        var html = templates["project-grid-item"](this.model.attributes);
        this.$el.html( html );
        return this;
      },

      events: {
        'click .project-item': 'click'
      },

      click : function( e ) {
        e.preventDefault();
        var url = $(e.currentTarget).attr("href");
        Events.trigger("router:navigate", url);
      }

    });
    return ProjectGridItemView;
  });
