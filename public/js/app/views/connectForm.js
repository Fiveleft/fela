// file views/connectForm.js
define(
  ['jquery','underscore','backbone','events'],
  function( $, _, Backbone, Events ){

    var _instance = false,
      Inquiry = Backbone.Model.extend(),
      InquiryOptions = Backbone.Collection.extend({
        model : Inquiry
      }),
      InquiryTypeView = Backbone.View.extend({
        tagName : "li",
        className : "inquiry-type-item",
        render : function() {
          this.$el.append( 
            "<a href=\"#\" class=\"inquiry-type\" data-value=\"" + this.model.attributes.value + "\">" +
            this.model.attributes.label +
            "</a>"
          );
        }
      }),
      inquiryOpts = new InquiryOptions([
          new Inquiry({ label: "New Business", value: "new business" }),
          new Inquiry({ label: "Collaboration", value: "collaboration" }),
          new Inquiry({ label: "Contractor Needed", value: "contractor needed" }),
          new Inquiry({ label: "General Inquiry", value: "general inquiry" })
        ]);


    var ConnectForm = Backbone.View.extend({

      initialize: function(){

        // Elements
        this.$body = $("body");
        this.$inquiryField = $(".input-field.inquiry");
        this.$inquiryInput = $("input[name='inquiry']");
        this.$inquirySelect = $(".inquiry-select", this.$inquiryField );
        this.$inquiryTypeList = $(".inquiry-type-list", this.$inquiryField );
        this.$inquiryTypes = $([]);

        this.render();
      },

      events: {
        'click a.inquiry-select' : 'openSelect',
        'click button.submit' : 'submit',
        'submit form' : 'submit'
      },

      closeSelect: function( e ) {

        var isType = $(e.target).is('.inquiry-type');
        var type = (isType) ? $(e.target) : false;

        if( isType ) {
          e.preventDefault();
          this.$inquiryTypes.each( function(i,el) {
            $(el).toggleClass( 'selected', $(el).text() === type.text() );
          });
          this.$inquiryInput.addClass( 'selected' );
          this.$inquiryInput.val( type.text() );
          this.$inquirySelect.focus();
        }


       // console.log( e, isType, type );
        this.$inquiryField.removeClass( "open" );
        this.$el.off( "focusin", function(e){self.focusSelect(e);} ); 
      },

      focusSelect: function( e ) {
        var isType = $(e.target).parents( ".input-field.inquiry").length ;
        //console.log( isType, e );
        if( !isType ) {
          this.closeSelect( e );
        }
      },

      openSelect: function( e ) {
        e.preventDefault();
        e.stopPropagation();
        var self = this;
       // console.log( " open select " );
        this.$inquiryField.addClass( "open" );
        
        this.$el
          .on( "focusin", function(e){self.focusSelect(e);} );

        this.$body
          .one( "click", function(e){self.closeSelect(e);} );
      },

      render: function(){
        var self = this;
        inquiryOpts.each( function( data ){
          itView = new InquiryTypeView({ model:data });
          itView.render();
          self.$inquiryTypeList.append( itView.el );
        }, this);

        this.$inquiryTypes = $('.inquiry-type', this.$inquiryTypeList );
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