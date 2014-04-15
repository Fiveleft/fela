
!function($){

	if( typeof window.fiveleft == "undefined" ) window.fiveleft = {};

	// Shortcuts
	var _cn = "MediaController"
		,_ref, _cls, _sel
		,imageLoadQueue = []
		,appData = false
		,currentProject = null
		,data = null

		// Elements
		,$media
		,$mediaContainer
		,$mediaControls
		,$mediaControlsInner
		,$galleryItems
		,$videoContainer
		,$videoElement

		// Properties
		,galleryCount = 0
		,galleryIndex = -1
		,galleryInterval = 2000
		,galleryTransitionTime = 0.75
		,galleryTransitionEase = Expo.easeInOut
		,galleryTimeout 
		,video;

	// Classes
	var _classes = {
		animating : "animating"
		,active : "active"
		,lastActive : "last-active"
		,playing : "playing"
		,paused : "paused"
		,mouseenter : "mouseenter"
	};



	function MediaController()
	{
		_ref = this;
		_cls = _classes;
	}


	MediaController.prototype = 
	{
		constructor : MediaController

		, isReady : false
		, isPlaying : false

		// Intended to be overwritten;
		, onReady : function(){}

		/**
		 * Initialize the ProjectMedia to the MediaController
		 * @param  {Project} Project.js Instance
		 */
		, init : function( project )
		{
			// log(_cn + "::init", project.data.name );
			appData = !appData ? fiveleft.applicationData : appData;

			// Clear the existnig project, if it is defined and does not match
			if( currentProject !== null && currentProject.data.id !== project.data.id ) {
				this.deinit( currentProject );
			}

			// Current project/data
			currentProject = project;
			data = project.data;

			// Always set load to false on init
			this.isReady = false;

			// Create elements
			$media = $(".media", currentProject.$element );
			$mediaContainer = $(".media-container", $media );
			$mediaControls = $(".media-controls", $media );
			$mediaControlsInner = $(".inner", $mediaControls );

			// Create Media based on type
			switch( data.media ) {
				case "video" : initVideo(); break;
				default : initGallery(); break;
			}

			// Add Listeners
			$mediaControls
				.on( "click", handleMediaControlToggle )
				.on( "mouseenter mouseleave", handleMediaControlHover );
		}


		/**
		 * De-initialize the Project Media from the MediaController
		 * @param  {Project} Project.js Instance (optional)
		 */
		, deinit : function( project )
		{
			this.stop();

			$mediaControls
				.off( "click", handleMediaControlToggle )
				.off( "mouseenter mouseleave", handleMediaControlHover );

			// log(_cn + "::deinit", project.data.id );
			if( project !== null ) {
				project.isPlaying = false;
				// Remove Listeners
				$(".media-controls", $media )
					.off( "click", handleMediaControlToggle )
					.off( "mouseenter mouseleave", handleMediaControlHover );
			}
			this.isReady = false;
			currentProject = null;
		}


		, play : function()
		{
			this.isPlaying = true;
			if( currentProject ) {
				currentProject.$element.addClass( _cls.playing );
			}
			startMedia();
		}


		, stop : function()
		{
			this.isPlaying = false;
			if( currentProject ) {
				currentProject.$element.removeClass( _cls.playing );
			}
			stopMedia();
		}


		, ready : function()
		{
			// log( _cn + "::ready()" );
			this.isReady = true;
			this.onReady();
		}
	};


	// These will be overridden based on the media type
	function startMedia() {
		if( data.media === "video" ) {
			startVideo();
		}else{
			startGallery();
		}
	}
	function stopMedia() {
		if( data.media === "video" ) {
			stopVideo();
		}else{
			stopGallery();
		}
	}


	// ------------------------------------------------------------------------------------------
	// Video Methods
	// ------------------------------------------------------------------------------------------


	/**
	 * [initVideo description]
	 * @return {[type]} [description]
	 */
	function initVideo() 
	{
		// log(_cn+"::startVideo", data.video );

		$videoElement = $("video", $mediaContainer);
		$videoElement.on( "loadstart loadeddata canplaythrough", videoEventHandler );
		video = $mediaContainer[0].getElementsByTagName("video")[0];
		video.load();
		// log( video );
	}


	function startVideo()
	{
		// log(_cn+"::startVideo");
		video.play();
	}


	function stopVideo()
	{
		// log(_cn+"::stopVideo");
		video.pause();
	}


	function videoEventHandler( e )
	{
		// log( e.type, e.target.videoWidth, e.target.videoHeight );
		if( e.type == "canplaythrough" ) {
			_ref.ready();
		}
	}


	// ------------------------------------------------------------------------------------------
	// Gallery Methods
	// ------------------------------------------------------------------------------------------



	function startGallery()
	{
		// log(_cn+"::startGallery");
		if( galleryCount > 1 ) advanceGalleryComplete();
	}


	function stopGallery()
	{
		// log(_cn+"::stopGallery");
		clearTimeout( galleryTimeout );
		galleryTimeout = 0;
	}


	function advanceGallery()
	{
		// log(_cn+"::advanceGallery - isPlaying:", _ref.isPlaying );
		var $activeItem, $nextItem;

		if( _ref.isPlaying ) {
			$activeItem = $($galleryItems[ galleryIndex ]);
			$nextItem = (galleryIndex + 1 == galleryCount) ? $galleryItems.first() : $activeItem.next();
			galleryIndex = $nextItem.index();

			// 
			$activeItem
				.removeClass( _cls.active )
				.addClass( _cls.lastActive )
				.siblings().removeClass( _cls.lastActive );
			$nextItem
				.addClass( _cls.active );

			TweenLite.to( $activeItem, galleryTransitionTime, {opacity:0, ease:galleryTransitionEase, clearProps:"all", onComplete:advanceGalleryComplete} );
		}
	}


	function advanceGalleryComplete()
	{
		// log(_cn+"::advanceGalleryComplete - isPlaying:", _ref.isPlaying );
		$galleryItems.removeClass( _cls.lastActive );
		if( _ref.isPlaying ) {
			galleryTimeout = setTimeout( advanceGallery, galleryInterval );
		}
	}


	/**
	 * [initGallery description]
	 * @return {[type]} [description]
	 */
	function initGallery() 
	{
		$galleryItems = $mediaContainer.find( ".gallery-item" );
		
		var $item
			,$img
			,$activeItem
			,$lastActiveItem
			,loaded

		// Reset the Load Queue
		imageLoadQueue = [];
		galleryCount = 0;

		$galleryItems.each( 
			function(index,item){
				$item = $(item);
				$img = $item.find("img");
				galleryCount ++;
				loaded = $img.length > 0 && $img[0].complete;
				if(!loaded) loadGalleryItem($item);
			});

		// Set Active Gallery Item
		if( galleryCount > 1 ) {

			// Gallery index is current "active" item or first item
			galleryIndex = $galleryItems.filter( "." + _cls.active ).length > 0 ? $galleryItems.filter( "." + _cls.active ).index() : 0;

			log( " initGallery, galleryIndex = ", galleryIndex );

			// Apply active class to first item
			$activeItem = $($galleryItems[galleryIndex]);
			$activeItem
				.addClass( _cls.active )
				.siblings().removeClass( _cls.active + " " + _cls.lastActive );
		}

		// log( _cn +"::initGallery", $activeItem.attr("data-id") );

		if( !imageLoadQueue.length || !$galleryItems.length ) {
			loadGalleryComplete();
		}
	}


	function loadGalleryComplete()
	{
		// log( _cn + "::loadGalleryComplete") ;
		_ref.ready();
	}


	/**
	 * [loadGalleryItem description]
	 * @param  {jQuery} $galleryItem [description]
	 * @return {[type]}              [description]
	 */
	function loadGalleryItem( $galleryItem )
	{
		var $holder = $galleryItem.find(".placeholder")
			,src = $holder.attr("data-src")
			,img = new Image();

		img.onerror = img.onabort = imageLoadError;
		img.onload = imageLoadComplete;
		img.hidden = true;

		$galleryItem.append( img );
		imageLoadQueue.push( img );

		img.src = src;
	}


	/**
	 * [imageLoadError description]
	 * @scope {Image}
	 */
	function imageLoadError( )
	{
		// log( _cn + "::imageLoadError ", this );
		removeImageFromLoadQueue( this );
	}


	/**
	 * [imageLoadComplete description]
	 * @scope {Image}
	 */
	function imageLoadComplete() 
	{
		var ratio = (this.height / this.width)
			,ratioClass = (ratio<0.56) ? "aspect-long" : (ratio > 0.57) ? "aspect-skinny" : "aspect-16x9";

		// log( " image load complete: ", this.width, " x ", this.height );
		$(this).siblings(".placeholder")
			.css("background-image","url(" + this.src + ")")
			.addClass( ratioClass );
		// log( _cn + "::imageLoadComplete - background-image:", $(this).siblings(".placeholder").css("background-image") );
		removeImageFromLoadQueue(this);
	}


	/**
	 * [removeImageFromLoadQueue description]
	 * @param  {Image} _img [description]
	 */
	function removeImageFromLoadQueue( _img ) 
	{
		// Image refers to "this" inside function scope;
		var img = _img.hasOwnProperty("src") ? _img : this
			,i = imageLoadQueue.length-1
			,end = 0
			,deleted = false;
		
		// Delete the Image from the load queue
		for( ; i>=end && !deleted; i-- ){
			if( imageLoadQueue[i].src == img.src ) {
				imageLoadQueue.splice(i,1);
				deleted = true;
			}
		}
		if( imageLoadQueue.length === 0 ) {
			loadGalleryComplete();
		}
	}	



	// ------------------------------------------------------------------------------------------
	// Animation Methods
	// ------------------------------------------------------------------------------------------


	function animatePlayState()
	{
		$mediaControls.addClass( _cls.animating );
		var icon = $mediaControlsInner.find(".icon");

		TweenLite.to( icon, 0.3, { opacity:0, ease:Expo.easeIn } );
		TweenLite.to( icon, 0.55, { scale:1.5, overwrite:0, ease:Expo.easeInOut, clearProps:"all", onComplete:animatePlayStateComplete } );
	}


	function animatePlayStateComplete()
	{
		$mediaControls.removeClass( _cls.animating );
		_ref[ (_ref.isPlaying ? "stop" : "play") ]();
	}


	// ------------------------------------------------------------------------------------------
	// Event Handlers
	// ------------------------------------------------------------------------------------------


	function handleMediaControlHover( event )
	{
		// log( " handleMediaControlHover", event.target );
		if( event.type === "mouseleave" ) {
			$mediaControls.children().removeAttr("style");
		}
		$mediaControls.toggleClass( _cls.mouseenter, event.type==="mouseenter" );
	}

	/**
	 * [handleMediaControlToggle description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	function handleMediaControlToggle( event )
	{
		event.preventDefault();
		animatePlayState();
	}


	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	fiveleft.MediaController = new MediaController();

}($);

