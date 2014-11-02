// partner.js
define(
  ['jquery', 'templates', 'backbone'],
  function( $, templates, Backbone ){
    var PageContentView = Backbone.View.extend({
      className: "page-content-wrapper",
      tagName: "section",
      render: function() {
        var html = templates["page-content"](this.model.attributes);
        this.$el.html( html ).attr("data-name", this.model.attributes.slug);
        $("[data-content='" + this.model.attributes.slug + "']").append( this.$el );
        return this;
      }
    });
    return PageContentView;
  });
