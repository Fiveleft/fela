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


// ClientView = Backbone.View.extend({
//   tagName: "li",
//   className: "client-item",
//   render: function() {
//     var template = $("#partnertemplate").html(),
//         compiled = Handlebars.compile(template),
//         html = compiled(this.model.attributes);
//     this.$el.html( html );
//     return this;
//   }
// });

// ClientCollectionView = Backbone.View.extend({
//   render: function() {
//     this.collection.each( function( client ){
//       var clientView = new ClientView({ model:client });
//       this.$el.append( clientView.render().el );
//     }, this);
//     return this;
//   }
// });

// AgencyView = Backbone.View.extend({
//   tagName: "li",
//   className: "agency-item",
//   render: function() {
//     var template = $("#partnertemplate").html(),
//         compiled = Handlebars.compile(template),
//         html = compiled(this.model.attributes);
//     this.$el.html( html );
//     return this;
//   }
// });
// AgencyCollectionView = Backbone.View.extend({
//   render: function() {
//     this.collection.each( function( agency ){
//       var agencyView = new AgencyView({ model:agency });
//       this.$el.append( agencyView.render().el );
//     }, this);
//     return this;
//   }
// });

