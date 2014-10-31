// partner.js
define(
  ['underscore', 'backbone', 'app/views/partner'],
  function( _, Backbone, PartnerView ){

    var partnerView;

    var PartnerCollectionView = Backbone.View.extend({
      render: function() {
        _.each(this.collection, function( partner ){
          partnerView = new PartnerView({ model:partner });
          this.$el.append( partnerView.render().el );
        }, this);
        return this;
      }
    });

    return PartnerCollectionView;
  });