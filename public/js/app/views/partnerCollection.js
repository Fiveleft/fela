// partner.js
define(
  [ 'jquery', 'underscore', 'backbone', 'app/views/partner'],
  function( $, _, Backbone, PartnerView ){

    var partnerView;

    var PartnerCollectionView = Backbone.View.extend({

      initialize: function( options ) {
        this.partnerType = options.type;
        if( !this.collection.length ) {
          this.listenTo( this.collection, "sync", this.render );
        }else{
          this.render();
        }
      },

      render: function() {

        var partnerTypeData = this.collection.where({ type: this.partnerType });

        _.each( partnerTypeData, function( partner ){
          partnerView = new PartnerView({ model:partner });
          this.$el.append( partnerView.render().el );
        }, this );
        return this;
      }
    });

    return PartnerCollectionView;
  });