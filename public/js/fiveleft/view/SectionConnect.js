if( typeof fiveleft == "undefined" ) fiveleft = {};

!function($){
	
	// Shortcuts
	var _cn = "SectionConnect"
		,_ref, _cfg, _sel, _cls, _evt
		,_defaults = {
			classes : {
				affixTop : "affix-top"
			}
		};


	/** 
	 * SectionConnect Consturctor
	 *  configure, define shortcuts and initialize
	 * @param element {DOM Element} - element acting as root of component
	 */
	function SectionConnect( element ) 
	{
		this._init( element, _defaults );
	}

	SectionConnect.prototype = {

		constructor : SectionConnect

		, init : function() 
		{
			this.classname = _cn;

			// Shortcuts
			_ref = this;
			_cfg = this.config;
			_sel = this.config.selectors;
			_cls = this.config.classes;
			_evt = fiveleft.Event;

			// Elements
			this.$fixed = $(".section-fix", this.element );
			this.$fixedInner = $(".section-fix-inner", this.element );
			this.minHeight = this.$fixedInner.outerHeight();
			 
			// Properties
			this.affixTop = false;
			this.resize();
		}

		, scroll : function()
		{
			var scrollState = this.element.attr("data-scroll");

			if( scrollState == "top-inside-viewport" || scrollState == "fill-viewport" || scrollState == "inside-viewport" ) {
				if( !this.affixTop ) {
					this.activate();
					this.affixTop = true;
					this.html.addClass( _cls.affixTop );
					this.window.trigger( fiveleft.Event.AffixTop, true );
				}
			}else{
				if( this.affixTop ) {
					this.deactivate();
					this.affixTop = false;
					this.html.removeClass( _cls.affixTop );
					this.window.trigger( fiveleft.Event.AffixTop, false );
				}
			}
		}

		, activate : function()
		{
			this.active = true;
			this.element.addClass( _cls.active );
			this.navItem.addClass( _cls.active );
		}

		, deactivate : function()
		{
			this.active = false;
			this.element.removeClass( _cls.active );
			this.navItem.removeClass( _cls.active );
		}

		, resize : function()
		{
			this.minHeight = this.$fixedInner.outerHeight();
			this.element.css({"min-height" : this.minHeight+"px"});

			// updateScrollResponse();
			// this.inner.css({"min-height" : "" });
			// this.refreshScrollSpy();
			// log( this.window.scrollTop(), this.top, this.bottom );
			// var padding = Math.round( this.window.height() * 0.75 );
			// this.$sections.not(":last-child").css({"padding-bottom" : padding });
		}
	};


	function handleMediaQueryChange()
	{
		// _ref.resize();
	}


	function handleSiteDataLoaded( )
	{
		_ref.resize();
		// _ref.startScrollSpy();
	}


	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	// SectionConnect.prototype = new fiveleft.SectionAbstract();
	// SectionConnect.prototype.constructor = SectionConnect;

	SectionConnect.extend( fiveleft.SectionAbstract );
	fiveleft.SectionConnect = SectionConnect;

}($);
