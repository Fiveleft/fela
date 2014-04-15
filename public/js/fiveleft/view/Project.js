
!function($){

	if( typeof window.fiveleft == "undefined" ) window.fiveleft = {};

	// Shortcuts
	var _cn = "Project"
		,_ref, _cfg, _sel, _cls, _evt
		,inactiveContainer
		,MC = false;


	function Project( element, data )
	{
		this.$element = $(element);
		this.$element
			.data("projectData", data)
			.data("project", this);
		this.data = data;

		MC = !MC ? fiveleft.MediaController : MC;

		// Shortcuts
		_ref = this;
		_cfg = this.config;
		_sel = this.config.selectors;
		_cls = this.config.classes;
		_evt = fiveleft.Event;

		// A static definition
		if( !inactiveContainer ) inactiveContainer = $(_sel.inactiveContainer);

		this.init();
	}



	Project.prototype = {

		constructor : Project

		, config : {
			classes : {
				animating: "animating"
				,inactive : "inactive"
				,measured : "measured"
				,mouseenter : "mouseenter"
				,playing : "playing"
			}
			,selectors : {
				parentView : ".project-view"
				,parentContainer : ".project-container"
				,inactiveContainer : ".inactive-project-container"
			}
		}

		, active : false
		, data : {}
		, isPlaying : false

		// should be overwritten
		, onActivated : function(){}
		, onDeactivated : function(){}

		// Change with each activation
		, $view : null
		, $container : null


		, init : function()
		{
			// Elements
			this.$inner = $(".project-inner", this.$element );
			this.$media = $(".media", this.$element );
			this.$mediaContainer = $(".media-container", this.$media );
			this.$mediaControls = $(".media-controls", this.$media );
			this.$mediaControlsInner = $(".inner", this.$mediaControls );
			this.$info = $(".info", this.$element );
			this.$title = $(".title", this.$info );
			this.$subtitle = $(".subtitle", this.$info );
			this.$details = $(".details", this.$info );
			this.$nextLink = $(".project-advance.next", this.$info);

			// Properties
			this.isPlaying = false;

			// Listeners
			this.$info.on( "mouseenter mouseleave", ".project-advance:not(.inactive)", handleNextLinkHover );
		}


		, mediaReady : function()
		{
			// log( _cn + "::mediaReady( " + this.data.name + " )" );
		}


		, play : function()
		{
			MC.play();
		}


		, stop : function()
		{
			MC.stop();
		}


		/**
		 * Activate Project animation
		 */
		, activate : function()
		{
			this.$view = this.$element.parents(_sel.parentView);
			this.$container = $(_sel.parentContainer, this.$view);

			// Init Media Controller
			MC.onReady = $.proxy(this, 'mediaReady');
			MC.init( this );

			var targetH = Math.max( $(window).height(), this.$element.outerHeight() )
				,targetY = this.$view.offset().top
				,delay = 0.65;

			// Offset the inactive view height, if it is BEFORE the view's position:
			targetY -= this.$view.prevAll( ".project-view" ).height();

			// log( _cn + "::activate( " + this.data.name + " ) \n\t onActivate = ", this.onActivated );

			// Scroll first, then do everything else
			TweenLite.to( window, 0.6, {scrollTo:{y:targetY}, ease:Cubic.easeInOut });
			TweenLite.to( this.$view, 0.6, {height:targetH, delay:0, ease:Cubic.easeInOut });

			CSSPlugin.defaultTransformPerspective = 500;

			TweenMax.fromTo( this.$media, 0.75, {rotationY:-5}, {rotationY:0, transformOrigin:"50% 50% -200", clearProps:"all", delay:delay+0.15, ease:Quart.easeOut} );
			TweenLite.fromTo( this.$media, 0.5, {opacity:0}, {opacity:1, delay:delay, clearProps:"all", ease:Cubic.easeInOut});
			TweenMax.fromTo( this.$info, 0.75, {rotationY:5}, {rotationY:0, transformOrigin:"50% 50% -200", clearProps:"all", delay:delay+0.15, ease:Quart.easeOut} );
			TweenLite.fromTo( this.$info, 0.5, {opacity:0}, {opacity:1, delay:delay, clearProps:"all", ease:Cubic.easeInOut});
			TweenLite.fromTo( this.$nextLink, 0.5, {opacity:0, right:"30px"}, {opacity:1, right:0, delay:delay+0.2, ease:Cubic.easeInOut });
			TweenLite.to( this, 1.0, {delay:delay, onComplete:$.proxy(this, 'activateComplete')});
			
			// Add the event listener for resizing
			$(window).on("resize", $.proxy(this, "resize"));
		}


		/**
	 	 * Activate animation completed
		 */
		, activateComplete : function()
		{
			// log( _cn + "::activateComplete");
			this.active = true;
			this.onActivated();
			if( MC.isReady ) {
				MC.play();
			}
		}


		/**
		 * Deactivate Project animation
		 * @param {Boolean} close (optional) scroll window to position of grid item
		 */
		, deactivate : function( close )
		{
			var delay = 0
				,windowY;

			// log( _cn + "::deactivate( " + this.data.name + " )");
			this.active = false;

			// De-Init Media Controller
			MC.stop();
			MC.onReady = null;
			MC.deinit( this );


			this.$view = this.$element.parents(_sel.parentView);
			this.$container = $(_sel.parentContainer, this.$view);

			// If the view is no longer active, add it to the deactivation animation
			if( !this.$view.hasClass( _cls.active ) ) {
				delay = 0.3;
				TweenLite.to( this.$view, 0.6, {delay:0, height:0, ease:Cubic.easeInOut});
			}

			if( close ) {
				windowY = this.$view.offset().top - 120;
				TweenLite.to( window, 0.6, {delay:0, scrollTo:{y:windowY}, ease:Cubic.easeInOut});
			}

			TweenMax.to( this.$media, 0.3, {rotationY:5, opacity:0, transformOrigin:"50% 50% -500", ease:Quart.easeIn} );
			TweenMax.to( this.$info, 0.3, {rotationY:-5, opacity:0, transformOrigin:"50% 50% -500", ease:Quart.easeIn} );
			TweenLite.to( this.$element, 0.6, {onComplete:$.proxy(this, 'deactivateComplete')});

			$(window).off("resize", $.proxy(this, "resize"));
		}



		/**
		 * Deactivate animation completed
		 */
		, deactivateComplete : function() 
		{
			this.onDeactivated( this );
		}


		, resize : function()
		{
			this.$view.height( Math.max( $(window).height(), this.$element.height()) );
		}



		, setNextProject : function( projectData ) 
		{
			if( projectData !== null ) {
				this.$nextLink.removeClass( _cls.inactive );
				this.$nextLink.attr("href", "/project/" + projectData.name );
				this.$nextLink.find(".project-title").text( projectData.title );
				// set the title width
				this.$nextLink.find(".project-title").width( this.$nextLink.find(".project-title").width() );
				this.$nextLink.addClass( _cls.measured );
			}else{
				this.$nextLink
					.addClass( _cls.inactive )
					.removeClass( _cls.measured );
			}
		}
	};


	// ------------------------------------------------------------------------------------------
	// Event Handlers
	// ------------------------------------------------------------------------------------------


	/**
	 * [handleNextLinkHover description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	function handleNextLinkHover( event ) 
	{
		var $tw = _ref.$nextLink.find(".title-wrapper")
			,$l = _ref.$nextLink.find(".label")
			,$t = _ref.$nextLink.find(".project-title")
			,tw = (event.type=="mouseenter") ? $t.width() : 0
			,lOp = (event.type=="mouseenter") ? 0 : 1
			,ease = Cubic.easeInOut;

		TweenLite.to( $tw, 0.35, { width:tw, ease:ease });
		TweenLite.to( $l, 0.35, { opacity:lOp, ease:ease });
	}


	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	fiveleft.Project = Project;

}($);

