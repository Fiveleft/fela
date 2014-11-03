// partner.js
define(
  ['jquery', 'templates', 'backbone', 'handlebars'],
  function( $, templates, Backbone, Handlebars ){

    var ProjectGridItemView = Backbone.View.extend({
      className: "project-grid-content",
      render: function() {
        var html = templates["project-grid-item"](this.model.attributes);
        this.$el.html( html );
        return this;
      }
    });
    return ProjectGridItemView;
  });
