// file views/connectForm.js
define(
  ['jquery','underscore','backbone','events'],
  function( $, _, Backbone, Events ){

    var _instance = false,
      iOS = false,
      submitTimeout = 0,
      defaultInquiryText = "",
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
          new Inquiry({ label: "General Inquiry", value: "general inquiry" }),
          new Inquiry({ label: "New Business", value: "new business" }),
          new Inquiry({ label: "Collaboration", value: "collaboration" }),
          new Inquiry({ label: "Contractor Needed", value: "contractor needed" }),
        ]);


    var ConnectForm = Backbone.View.extend({

      initialize: function(){

        // Elements
        this.$html = $("html");
        this.$body = $("body");
        this.$inquiryField = $(".input-field.inquiry", this.$el);
        this.$inquiryInput = $("input[name='inquiry']", this.$el);
        this.$inquirySelect = $(".inquiry-select", this.$inquiryField );
        this.$inquiryTypeList = $(".inquiry-type-list", this.$inquiryField );
        this.$inquiryTypes = $([]);
        this.$uiInputs = $("input,textarea", this.$el );
        this.$iosIntercepts = $("button.ios-intercept", this.$el );
        this.$submit = $( "button.submit", this.$el );

        defaultInquiryText = this.$inquirySelect.text();
        iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

        this.$html.toggleClass('ios', iOS); 

        this.render();
      },

      render: function(){
        var self = this;
        inquiryOpts.each( function( data ){
          itView = new InquiryTypeView({ model:data });
          itView.render();
          self.$inquiryTypeList.append( itView.el );
        }, this);


        this.$inquiryTypes = $('.inquiry-type', this.$inquiryTypeList );

        // Apply inquiry type to form input
        this.$inquiryInput.attr( "value", $(this.$inquiryTypes[0]).text() );

        // Update iOS Intercepts
        this.$iosIntercepts.each( function(i,el){

          if( iOS ) {
            $(el)
              .on('touchstart', uiElementClick)
              .siblings('input,textarea').attr("disabled", true);
          }else{
            $(el).css({"display" : "none"});
          }

        });
      },

      events: {
        'click a.inquiry-select' : '_openSelect',
        'click button.submit' : '_submit',
        'submit form' : '_submit'
      },


      iosFormFocus : function(){

        // console.log( "here" );
        var self = this;

        if( !this.$html.hasClass('ios-keyboard') ) {
          
          this.$html
            .addClass( 'ios-keyboard' )
  
          this.$iosIntercepts.each( function(i,el){
            $(el)
              .css({"display" : "none"})
              .siblings('input,textarea')
                .removeAttr("disabled")
                .on('focusin', uiInputFocus)
                .on('focusout', uiInputBlur)
                .on('blur', uiInputBlur);
          });
          this.$el.blur();
        }
      },

      iosFormBlur : function(){

        var self = this;

        this.$html
          .removeClass( 'ios-keyboard' );

        this.$iosIntercepts.each( function(i,el){
          $(el)
            .css({"display" : "block"})
            .siblings('input,textarea')
              .attr("disabled",true)
              .off('focusin', uiInputFocus)
              .off('focusout', uiInputBlur)
              .off('blur', uiInputBlur);
        });
      },

      _iosCheckFocus : function( e ) {
        
        var isInputChild = $(e.target).parents('.input-wrapper').length > 0;
        console.log( 'ConnectForm._iosCheckFocus  - isInputChild:', isInputChild, "target:", e.target );

        if( !isInputChild ) {

          var focused = $(":focus");
          focused.blur();
          console.log( focused );

          // $(e.target).focus();
          this.iosFormBlur();
        }  
      },


      _closeSelect: function( e ) {

        var isType = $(e.target).is('.inquiry-type');
        var type = (isType) ? $(e.target) : false;

        if( isType ) {
          e.preventDefault();
          this.$inquiryTypes.each( function(i,el) {
            $(el).toggleClass( 'selected', $(el).text() === type.text() );
          });
          this.$inquiryInput.addClass( 'selected' );
          this.$inquiryInput.attr( "value", type.text() );
          this.$inquirySelect
            .text(type.text())
            .focus();
        }

        this.$inquiryField.removeClass( "open" );
        this.$el.off( "focusin", function(e){self._focusSelect(e);} ); 
      },


      _focusSelect: function( e ) {
        var isType = $(e.target).parents( ".input-field.inquiry").length ;
        //console.log( isType, e );
        if( !isType ) {
          this._closeSelect( e );
        }
      },


      _openSelect: function( e ) {
        e.preventDefault();
        e.stopPropagation();
        var self = this;
        this.$inquiryField.addClass( "open" );
        
        this.$el
          .on( "focusin", function(e){self._focusSelect(e);} );

        this.$body
          .one( "click", function(e){self._closeSelect(e);} );
      },

      _submitDisable: function() {

        var self = this;

        // console.log( "_submitDisable()" );
        this.$el.addClass( "sending" );
        this.$inquiryField.attr("disabled", false);
        this.$uiInputs.attr("disabled", true);
        this.$submit.attr("disabled", true);

        clearTimeout( submitTimeout );
        submitTimeout = setTimeout( function(){ 
          self._reset();          
        }, 4000 );
      },

      _reset: function() {
        // console.log( "_reset()" );
        this.$el.removeClass("sent-success sent-fail sending");
        this.$inquiryField.attr("disabled", true);
        this.$uiInputs.removeAttr("disabled");
        this.$submit.removeAttr("disabled");
      },

      _submit: function( e ) {
        e.preventDefault();

        var self = this,
          d = this.$el.serialize();

        this._submitDisable();
                
        // Set up AJAX        
        $.ajax({
          type: "POST",
          url: "/send-inquiry",
          data: d
        })
        .done(function( /*msg*/ ) {
          // console.log( " inquiry sent,", msg, d );
          self.$el.addClass("sent-success");
        })
        .fail(function( /*jqXHR, textStatus*/ ) {
          // console.log( " inquiry failed,", jqXHR, textStatus );
          self.$el.addClass("sent-fail");
        });
      }
    });


    function uiInputClick( e ) {
      console.log( e.type, $(this).attr('name'), e );
      $(this).focus();
    }

    function uiInputFocus( e ) {
      console.log( e.type, $(this).attr('name'), e );
    }

    function uiInputBlur( e ) {
      var keepFormFocus = $(e.relatedTarget).is('textarea,input');
      console.log( e.type, $(this).attr('name'), "keepFormFocus:", keepFormFocus, e  );
      if( !keepFormFocus ) {
        _instance.iosFormBlur();
      }
    }

    function uiElementClick( e ) {
      console.log( e.type, this, e );  
      if( e.type === "click" ) {
        e.preventDefault();
      }else{
        _instance.iosFormFocus();
      }
      $(this)
        .hide()
        .siblings("input,textarea")
          .removeAttr("disabled")
          .one('click', uiInputClick);
    }





    if( !_instance ) _instance = new ConnectForm({el:$("#connect-form")});
    return _instance;
  });