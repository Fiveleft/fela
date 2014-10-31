// partner.js
define(
  ['templates', 'backbone'],
  function( templates, Backbone ){
    var PageContentView = Backbone.View.extend({
      className: "page-content-wrapper",
      tagName: "section",
      render: function() {
        var html = templates["page-content"](this.model.attributes);
        this.$el.html( html );
        return this;
      }
    });
    return PageContentView;
  });
