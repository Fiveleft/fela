// partner.js
define(
  ['templates', 'backbone'],
  function( templates, Backbone ){

    var PartnerView = Backbone.View.extend({
      initialize: function() {
        this.model.attributes.type = this.model.attributes.type.replace(/fiveleft_/, "");
      },
      tagName: "li",
      className: function(){
        return this.model.attributes.type + "-item partner-item";
      },
      render: function() {
        var html = templates["partnership-item"](this.model.attributes);
        this.$el.html( html );
        return this;
      }
    });
    return PartnerView;
  });