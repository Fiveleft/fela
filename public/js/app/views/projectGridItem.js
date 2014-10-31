// partner.js
define(
  ['templates', 'backbone'],
  function( templates, Backbone ){

    var ProjectGridItemView = Backbone.View.extend({
      className: "project-content",
      render: function() {
        var html = templates["project-grid-item"](this.model.attributes);
        this.$el.html( html );
        return this;
      }
    });
    return ProjectGridItemView;
  });
