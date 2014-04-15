if( typeof fiveleft == "undefined" ) fiveleft = {};

!function($){
		
	/* Classname */
	var _cn = "SectionWelcome"
		,_ref, _cfg, _sel, _cls, _evt
		,_defaults = {
			classes : {
				lastActive : "last-active"
				,complete : "complete"
			}
			,selectors : {
				messageContainer : ".message-container"
				,messageNavItem : ".message-nav-item"
				,message : ".message"
			}
		}
		,arrivedOnce = false
		,animating = false
		,messageIndex = 1
		,messageCount = 0;


	/** 
	 * ProjectView Consturctor
	 *  configure, define shortcuts and initialize
	 * @param element {DOM Element} - element acting as root of component
	 * @param options {Object} - configuration override
	 */
	function SectionWelcome( element, options ) 
	{
		this._init( element, _defaults );
	}

	SectionWelcome.prototype = {

		constructor : SectionWelcome

		, init : function()
		{
			this.classname = _cn;

			// Shortcuts
			_ref = this;
			_sel = this.config.selectors;
			_cls = this.config.classes;
			_evt = fiveleft.Event;

			// Elements
			this.$heroImage = $(".hero-image", this.$inner );
			this.$heroLogo = $( ".hero-logo", this.$inner );
			this.$heroCanvas = $( ".hero-canvas", this.$heroLogo );
			this.$heroMask = $(".hero-mask", this.$heroLogo );
			this.$heroFill = $(".hero-fill", this.$heroLogo );
			this.$messageContainer = $( ".message-container", this.$inner );
			this.$messageScroller = $( ".message-scroller", this.$inner );
			this.$messageSteps = $(".message-step", this.$messageContainer);
			this.$message = $( ".message", this.$messageScroller );
			this.$messageNav = $( ".message-nav", this.$inner );
			this.$advanceButton = $( ".advance", this.$messageNav );

			// 
			this.$activeMessage = $( ".message-step." + _cls.active, this.$messageContainer );
			// log( this.activeMessage );

			// Properties
			animating = false;
			completed = this.appData.introCompleted == true;
			messageIndex = 0;
			messageCount = this.$message.length;

			// Resize to proper height immediately
			this.resize();

			// Listeners
			this.inner.on( "click", handleMessageChange );
			this.$advanceButton.on( "click", handleMessageChange );
			this.window.on( "orientationchange", $.proxy(this,'resize'));

		}

		, activate : function()
		{
			log( "SectionWelcome::activate || completed = ", completed);
			if( completed ) {
				_ref.element.addClass( _cls.complete );
			}
			changeMessageIndex( messageIndex+1 );
			this.active = true;
			this.element.addClass( _cls.active );
		}

		, deactivate : function()
		{
			this.active = false;
			this.element.removeClass( _cls.active );
		}

		, resize : function()
		{
			var heroW = this.$heroImage.width()
				,heroH = this.$heroImage.height()
				,size = Math.round( Math.min( heroW, heroH ));

			this.inner.css({"min-height" : this.window.height() });
			this.$heroLogo.css({"width" : size+"px", "height" : size+"px" });
		}

		, onSiteDataLoaded : function()
		{
			this.resize();
		}

		, onMediaQueryChange : function()
		{
			
		}
	}


	function changeMessageComplete( lastItem ) 
	{
		// log( _cn+"::changeMessageComplete() lastItem ? ", lastItem  );
		animating = false;
		if( lastItem ) showFinalAnimation();
	}


	function showFinalAnimation()
	{
		handleMessagesComplete();
		// log( _cn+"::showFinalAnimation"  );
		// _ref.$heroMask.css({"visiblity":"visible"});
		// TweenLite.fromTo( _ref.$heroFill, 0.5, {opacity:0}, {opacity:1, delay:0.1, ease:Cubic.easeOut, onComplete:handleMessagesComplete});
	}


	function handleMessagesComplete()
	{
		// log( _cn+"::handleMessagesComplete()" );
		completed = true;
		messageIndex = 1;
		_ref.element.addClass( _cls.complete );
		_ref.window.trigger( _evt.IntroSequenceComplete );
	}

	function swapMessage()
	{
		// log( _cn+"::swapMessage()" );
		_ref.window.trigger( _evt.IntroSequenceChange, messageIndex );
		_ref.$messageSteps.filter(".active").siblings().removeClass("last-active");
	}


	/** 
	 * GoTo Message
	 * @param {int} index
	 */
	function changeMessageIndex( index ) 
	{
		// log( _cn+"::changeMessageIndex( " + index + " )" );
		var newMessageIndex = index
			,currMessage = _ref.$messageSteps.filter('[data-index=' + messageIndex + ']')
			,nextMessage = _ref.$messageSteps.filter('[data-index=' + newMessageIndex + ']')
			,nextEase = Quart.easeOut
			,currEase = Quart.easeIn
			,speed = 0.75
			,nextDelay = currMessage.length > 0 ? speed : 0
			,tOrigin = "50% 50% -300"
			,lastItem = nextMessage.length===0;

		if( lastItem ) {
			nextMessage = _ref.$messageSteps.filter('[data-index=1]');
		}

		nextMessage.addClass( "active" );
		currMessage.removeClass("active").addClass( "last-active" );

		animating = true;
		messageIndex = lastItem ? 0 : newMessageIndex;

		// Run animations
		TweenMax.fromTo( currMessage, speed, 
			{rotationY:0, opacity:1}, 
			{rotationY:-85, translateX:-100, opacity:0, overwrite:0, transformOrigin:tOrigin, clearProps:"all", ease:currEase, onComplete:swapMessage} 
		);

		TweenMax.fromTo( nextMessage, speed, 
			{rotationY:85, translateX:100, opacity:0}, 
			{rotationY:0, translateX:0, delay:nextDelay, opacity:1, overwrite:0, transformOrigin:tOrigin, clearProps:"all", ease:nextEase} 
		);

		TweenMax.delayedCall( speed+nextDelay, function(){changeMessageComplete(lastItem)} );
	}

	
	/**
	 * Handle Message Change
	 * @param {Event} event
	 * @return {null}
	 */
	function handleMessageChange( event ) 
	{
		event.preventDefault();
		event.stopImmediatePropagation();
		if( !completed && !animating ) changeMessageIndex( messageIndex+1 );
		return;
	}






	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	// SectionWelcome.prototype = new fiveleft.SectionAbstract();
	// SectionWelcome.prototype.constructor = SectionWelcome;
	
	SectionWelcome.extend( fiveleft.SectionAbstract );
	fiveleft.SectionWelcome = SectionWelcome;

}($);
