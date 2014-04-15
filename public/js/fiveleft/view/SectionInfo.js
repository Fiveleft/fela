if( typeof fiveleft == "undefined" ) fiveleft = {};

!function($){
	
	// Shortcuts
	var _cn = "SectionInfo"
		,_ref, _cfg, _sel, _cls, _evt
		,_defaults = {
			classes : {
				scrollResponse : "scroll-response"
			}
		};


	/** 
	 * SectionInfo Consturctor
	 *  configure, define shortcuts and initialize
	 * @param element {DOM Element} - element acting as root of component
	 * @param options {Object} - configuration override
	 */
	function SectionInfo( element ) 
	{
		this._init( element, _defaults );
	}

	SectionInfo.prototype = {

		constructor : SectionInfo

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
			this.$portrait = $(".portrait", this.element);
			this.$portraitInner = $(".portrait-inner", this.$portrait);
			this.$nav = $(".info-nav", this.element);
			this.$navLinks = $(".info-link", this.$nav );
			this.$sectionContainer = $(".section-container", this.element);
			this.$sections = $("section", this.$sectionContainer );
			this.$clientList = $(".client-list");
			this.$agencyList = $(".agency-list");

			// Properties
			this.portraitTop = null;
			this.targetOffset = parseFloat(this.$sectionContainer.css("padding-top"));
			this.onDataLoadTarget = null;
			this.activeTarget = null;

			// Templates
			this.partnershipTemplate = Handlebars.compile( $("#partnership-item-template").html() );
		}

		, onSiteDataLoaded : function()
		{
			$( this.appData.getAgencies() ).each( function(i,agency){
				_ref.$agencyList.append( _ref.partnershipTemplate(agency) );
			});
			$( this.appData.getClients() ).each( function(i,client){
				_ref.$clientList.append( _ref.partnershipTemplate(client) );
			});

			// Update positions
			this.resize();

			if( this.onDataLoadTarget !== null ) {
				activateTarget( this.onDataLoadTarget );
				this.onDataLoadTarget = null;
			}
		}

		, onMediaQueryChange : function()
		{
			if( !this.appData.scrollLayout ) {

			}
			// _ref.resize();
		}


		, positionPortrait : function()
		{
			if( this.element.attr("data-scroll") !== "bottom-inside-viewport" ) {
				if( this.portraitTop !== "" ) {
					this.portraitTop = "";
					this.$portrait.css({"top" : this.portraitTop});
				}
				return;
			}
			this.portraitTop = (this.bottom-this.top) - this.window.height();
			this.$portrait.css({ "top" : this.portraitTop });
		}


		, scroll : function()
		{
			// log("SectionInfo::scroll");
			if( this.appData.scrollLayout ) this.positionPortrait();
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
			this.activeTarget = false;
			this.element.removeClass( _cls.active );
			this.navItem.removeClass( _cls.active );
		}


		, resize : function()
		{
			var navOffset = Math.ceil( this.$nav.find("ul").offset().top - this.$portrait.offset().top )
				,windowHeight = this.window.height()
				,sHeight = this.appData.scrollLayout ? windowHeight : 0
				,sPadding = this.appData.scrollLayout ? navOffset : "";


			// Update target offset
			this.targetOffset = parseFloat(this.$sectionContainer.css("padding-top"));
			this.inner.css({"min-height" : this.window.height() });


			// Update Sub section vertical spacing
			this.$sections.each( function(i,s) {
				$(s).css({"min-height" : sHeight, "padding-top" : sPadding });
			});

			if( this.appData.scrollLayout ) {
				this.positionPortrait();
			}else{
				this.$portrait.css({"top" : ""});
			}

			if( this.active && this.activeTarget ) {
				var scrollPosition = _ref.appData.scrollLayout ? this.activeTarget.offset().top : _ref.element.offset().top;
				this.window.scrollTop( scrollPosition );
			}

		}


		, target : function( path )
		{
			var subTarget = (path[1]) ? this.$sections.filter("[data-id=" + path[1] + "]") : $(this.$sections[0]);

			this.$navLinks.each( function(i,nl) {	
				$(nl).toggleClass( _cls.active, $(nl).attr("href") == location.pathname );
			});

			subTarget.addClass( _cls.active )
				.siblings().removeClass( _cls.active );

			switch( true )
			{
				case !this.appData.dataLoaded :
					this.onDataLoadTarget = subTarget;
					break;
				default :
					activateTarget( subTarget );
					break;
			}
		}
	};



	function activateTarget( target )
	{
		var scrollPosition = _ref.appData.scrollLayout ? target.offset().top : _ref.element.offset().top;
		_ref.activeTarget = target;
		_ref.scrollToPosition( scrollPosition );
	}



	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	// SectionInfo.prototype = new fiveleft.SectionAbstract();
	// SectionInfo.prototype.constructor = SectionInfo;

	SectionInfo.extend( fiveleft.SectionAbstract );
	fiveleft.SectionInfo = SectionInfo;

}($);
