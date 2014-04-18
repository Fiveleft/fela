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
			completed = this.appData.introCompleted;
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

		, scroll : function( _scrollState )
		{
			var scrollState = _scrollState||this.element.attr("data-scroll")
				,scrollActive = /fill\-viewport|inside\-viewport|top\-inside\-viewport/.test( scrollState );

			switch( true ) {
				case this.started && scrollActive && !this.active :
					this.activate();
					break;
				case this.started && !scrollActive && this.active :
					this.deactivate();
					break;
			}
		}

		, resize : function()
		{
			var heroW = this.$heroImage.width()
				,heroH = this.$heroImage.height()
				,size = Math.round( Math.min( heroW, heroH ));

			this.inner.css({"min-height" : this.window.height() });
			this.$heroLogo.css({"width" : size+"px", "height" : size+"px" });
		}

		, onStart : function()
		{
			log( _cn+"::start!" );
			this.scroll();
		}

		, onSiteDataLoaded : function()
		{
			this.resize();
		}

		, onMediaQueryChange : function()
		{
			
		}
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
		animating = false;
		_ref.window.trigger( _evt.IntroSequenceChange, messageIndex );
		_ref.$messageSteps.filter(".active").siblings().removeClass("last-active");
	}


	/** 
	 * GoTo Message
	 * @param {int} index
	 */
	function changeMessageIndex( index ) 
	{
		log( _cn+"::changeMessageIndex( " + index + " )" );

		var newMessageIndex = index
			,currMessage = _ref.$messageSteps.filter('[data-index=' + messageIndex + ']')
			,nextMessage = _ref.$messageSteps.filter('[data-index=' + newMessageIndex + ']')
			,nextEase = Quart.easeOut
			,currEase = Quart.easeIn
			,speed = 0.35
			,nextDelay = 0.01 + (currMessage.length > 0 ? speed : 0)
			,tOrigin = "50% 50% -50%"
			,lastItem = nextMessage.length===0;

		if( lastItem ) {
			nextMessage = _ref.$messageSteps.filter('[data-index=1]');
		}

		nextMessage.addClass( "active" );
		currMessage.removeClass("active").addClass( "last-active" );

		// animating = true;
		messageIndex = lastItem ? 0 : newMessageIndex;

		log( "\tcurrMessage = ", currMessage );
		log( "\tnextMessage = ", nextMessage );
		log( "\tnextDelay = ", nextDelay );

		// TweenLite.to( currMessage, speed, {opacity:0, marginLeft:"-200px", ease:currEase});
		// TweenLite.fromTo( nextMessage, speed, {delay:speed, opacity:1, marginLeft:0, ease:nextEase})
		if( _ref.appData.isiOS ) 
		{
			fiveleft.drawingApi.pause();

			currMessage.css({opacity:1});
			nextMessage.css({opacity:0});
			TweenLite.to( currMessage, speed, {opacity:0, ease:currEase});
			TweenLite.to( nextMessage, speed, {delay:nextDelay, opacity:1, ease:nextEase
					,onStart : swapMessage
					,onComplete : function(){changeMessageComplete(lastItem)} });
			// TweenMax.delayedCall( speed+nextDelay, function(){changeMessageComplete(lastItem)} );
			log( " here? ");
		}
		else{
			TweenMax.fromTo( currMessage, speed, 
				{rotationX:0, opacity:1}, 
				{rotationX:-90, marginTop:"-150px", opacity:0, transformOrigin:tOrigin, clearProps:"margin-top", ease:currEase} 
			);
			TweenMax.fromTo( nextMessage, speed, 
				{rotationX:90, marginTop:"150px", opacity:0}, 
				{rotationX:0, marginTop:0,  delay:nextDelay, opacity:1, transformOrigin:tOrigin, clearProps:"margin-top", ease:nextEase, onStart:swapMessage} 
			);
		}

		// TweenMax.delayedCall( speed+nextDelay, function(){changeMessageComplete(lastItem)} );
	}

	function changeMessageComplete( lastItem ) 
	{
		log( _cn+"::changeMessageComplete() lastItem ? ", lastItem  );

		animating = false;
		if( _ref.appData.isiOS && !lastItem ) {
			fiveleft.drawingApi.resume();
		} 
		if( lastItem ) showFinalAnimation();
	}

	
	/**
	 * Handle Message Change
	 * @param {Event} event
	 * @return {null}
	 */
	function handleMessageChange( event ) 
	{
		// log( "SectionWelcome::handleMessageChange", event.type );
		// log( "\tcompleted:", completed );
		// log( "\tanimating:", animating );
		if( event.type === "click" ) event.preventDefault();
		// event.stopImmediatePropagation();
		// if( !completed && !animating ) {
		if( !animating ) {
			changeMessageIndex( messageIndex+1 );
		}

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
