// Filename: models/partners.js
define(['underscore','backbone'], 
  function(_, Backbone) {

    var PartnerModel = Backbone.Model.extend({
      initialize: function() {
        this.attributes.priority = 100;
        if( this.attributes.info ) {
          this.attributes.priority = parseInt(this.attributes.info.priority,10) || 100;
        }
        if( this.attributes.type === 'fiveleft_agency' ) {
          // console.log( this.attributes.info );
        }
        // console.log( this.attributes.slug, this.attributes.priority );
      }
    });

    return PartnerModel;
  });