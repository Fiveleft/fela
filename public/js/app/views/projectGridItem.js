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
        this.$gridLink = $( ".project-item", this.$el );

        this.allowHover = !$("html").hasClass('touch');

        return this;
      },

      events: {
        'click .project-item': '_click',
        'mouseenter .project-item': '_mouseEnter',
        'mouseleave .project-item': '_mouseLeave',
        'touchstart .project-item': '_mouseEnter',
        'touchend .project-item': '_mouseLeave'
      },

      _click : function( e ) {
        e.preventDefault();
        var url = $(e.currentTarget).attr("href");
        Events.trigger("router:navigate", url);
      },

      _mouseEnter : function() {
        this.$gridLink.addClass( this.allowHover ? "hover" : "touch" );
      },

      _mouseLeave : function() {
        this.$gridLink.removeClass( this.allowHover ? "hover" : "touch" );
      }

    });
    return ProjectGridItemView;
  });
