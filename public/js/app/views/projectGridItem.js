// partner.js
define(
  ['jquery', 'templates', 'backbone', 'events'],
  function( $, templates, Backbone, Events ){

    var ProjectGridItemView = Backbone.View.extend({
      
      className: "project-grid-item",

      render: function() {
        var c, 
          context, 
          html;

        c = this.model.collection;
        context = _.extend({index:c.indexOf(this.model)}, this.model.attributes);
        html = templates["project-grid-item"](context);
        this.$el.html( html );
        return this;
      },

      events: {
        'click .project-item': '_click'
      },

      _click : function( e ) {
        e.preventDefault();
        var url = $(e.currentTarget).attr("href");
        Events.trigger("router:navigate", url);
      },

    });
    return ProjectGridItemView;
  });
