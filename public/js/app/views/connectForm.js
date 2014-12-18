// file views/connectForm.js
define(
  ['jquery','underscore','backbone','events'],
  function( $, _, Backbone, Events ){


    var _instance = false,
      inquiryOptions = new Backbone.Collection();


    var ConnectForm = Backbone.View.extend({

      initialize: function(){
        //console.log( "connectForm.initialize()", this.el );

      },

      events: {
        'click button.submit' : 'submit',
        'submit form' : 'submit'
      },

      render: function(){
        console.log( "connectForm.render()");
        
      },

      submit: function( e ) {
        e.preventDefault();
        var d = this.$el.serialize();
        console.log( "connectForm.submit()", d );
      }
    });

    if( !_instance ) _instance = new ConnectForm({el:$("#connect-form")});
    return _instance;
  });