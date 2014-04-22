
!function($){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	var _cn ,_api ,_evt

		/* ------------------------- */
		/* Canvases: */
		// only displays when show viewport = “true”
		,viewportCanvas, vCvs, vCtx
		,renderingCanvas, rCvs, rCtx
		,artworkCanvas, aCvs, aCtx
		,introCanvasElement, introCanvas, iCvs, iCtx
		,displayCanvas, dCvs, dCtx

		// Composition Display Rect is the composition size for ontop of the display canvas
		,compositionDisplay = new fiveleft.Rectangle()
		,userPosition = new fiveleft.Vector()
		,device = {
			motion : new fiveleft.MotionVector()
			,orientation : new fiveleft.MotionVector()
		}
		,touchActive = false
		,userActive = false
		,introState = false
		,playing = false
		,doRender = false
		,controller = null
		,ticker
		,timer;

	// Guides
	var rpts = {
		created : false
		,context : null
		,user : null
	};

	// The Important parts
	var brush = new fiveleft.Brush()
		,shapeBuilder = new fiveleft.ShapeBuilder()
		,layout

	/** 
	 * DrawingAPI Consturctor
	 * <p>DrawingAPI.js</p>
	 * @param canvas {Canvas DOMElement} - base DOMElement for component
	 */
	function DrawingAPI() 
	{	
		// Shortcuts
		_api = this;
		_cn  = "DrawingAPI";
		_evt = fiveleft.event;
	}


	DrawingAPI.prototype = {

		constructor : DrawingAPI

		, playing : false
		, paused : false
		, assetQueue : null
		, compositionLayout : null

		/**
		 * Initialize Class
		 */
		, init : function( canvas ) 
		{
			// CompositionLayout Creates the rules for drawing a balanced composition
			this.compositionLayout = layout = new fiveleft.CompositionLayout();
			
			// Create Canvases
			createCanvases( canvas );

			// Shape Builder
			shapeBuilder = new fiveleft.ShapeBuilder();
			
			brush = new fiveleft.Brush();
			brush.setSize( layout.artwork.area.width, layout.artwork.area.height );
			brush.thickness = 2;

			// Device Position
			device.motion.onUpdate = deviceMotion_onUpdate;
			device.orientation.onUpdate = deviceOrientation_onUpdate;

			// Asset Queue
			assetQueue = null;

			timer = new Timer();
			ticker = TweenLite.ticker;
			controller = setController();

			// Update Timer
			timer.onDelayComplete = handleTimerDelay;

			// Asset Loading
			this.initAssetLoading();
		}


		, initAssetLoading : function()
		{
			assetQueue = new createjs.LoadQueue(true);
			assetQueue.addEventListener( "complete", handleLoadQueueEvent );
			assetQueue.addEventListener( "error", handleLoadQueueEvent );
			assetQueue.addEventListener( "fileload", handleLoadQueueEvent );
			assetQueue.loadManifest([
					{id:"bg-pat", src:"/img/draw-assets/bg-grid-pat.png"}
					,{id:"sprite-patterns", src:"/img/draw-assets/spritesheet-patterns.png"}
					,{id:"sprite-blobs", src:"/img/draw-assets/spritesheet-blobs.png"}
					,{id:"sprite-splatters", src:"/img/draw-assets/spritesheet-splatters.png"}
					// ,{id:"sprite-splatters", src:"img/draw-assets/spritesheet-splatters.jpg"}
				], false);
			assetQueue.load();
		}


		, start : function() 
		{
			this.playing = true;
			controller.play = true;
			timer.start();
			layout.start();
			applyEventListeners( true );
		}


		, stop : function() 
		{
			this.playing = false;
			// log( "DrawingAPI::stop" );
			// log( "\tdrawingApi.playing = ", this.playing );
			// log( "\tdrawingApi.paused = ", this.paused );
			controller.play = false;
			timer.stop();
			layout.stop();
			applyEventListeners( false );
		}

		, pause : function()
		{
			// if( this.paused ) return;
			// log( "DrawingAPI::pause" );
			this.paused = true;
			// this.stop();
		}

		, resume : function()
		{
			// if( !this.paused ) return;
			// log( "DrawingAPI::resume" );
			this.paused = false;
			// this.start();
		}

		, tick : function() 
		{
			doRender = _api.playing && !_api.paused;	
			timer.update();
			layout.update();
			if( doRender ) {
				_api.render();
			}
		}


		, toIntro : function()
		{
			log( "toIntro" );
			introState = true;
			// iCtx.clearRect( 0, 0, iCvs.width, iCvs.height );
			layout.animateToIntro();

		}
		, fromIntro : function() 
		{
			log( "DrawingAPI::fromIntro" );
			introState = false;
			layout.animateToFull();
		}


		, startIntro : function( $canvasElement )
		{
			// introState = true;
			introCanvas = iCvs = $canvasElement[0];
			introCanvas.width = introCanvas.clientWidth;
			introCanvas.height = introCanvas.clientHeight;

			var src = $canvasElement.siblings(".hero-fill").css("background-image");
			src = src.substring(4,src.length-1);
			introMask = new Image();
			introMask.src = src;
			
			introState = true;

			// Send IntroCanvas to CompositionLayout
			layout.setIntro( introCanvas );

			// Start
			this.start();
		}


		, setUserPosition : function( x, y )
		{
			userPosition.set( x, y );
			layout.setUserPosition( userPosition );
		}


		, setSize : function( w, h ) 
		{
			layout.setSize( w, h );
			compositionDisplay.scaleRect( layout.viewport.area, 0.33 );
			this.render();
		}


		, setScrollRatio : function( value ) 
		{ 
			// log( "DrawingAPI::setScrollRatio", value.toFixed(2) );
			layout.setScrollRatio(value);
		}


		, render : function() 
		{
			drawToArtwork();
			drawToDisplay();	
			if( controller.showGuides ) drawGuides();
		}
	};


	function deviceMotion_onUpdate()
	{
		
	}

	function deviceOrientation_onUpdate()
	{

	}


	// --------------------------------------------------------------------
	// **
	// --------------------------------------------------------------------


	function handleTimerDelay () 
	{
		// log( " HANDLE TIMER DELAY ");
		brush.color = fiveleft.Color.random(100,180).desaturate(25);
		brush.thickness = randomBetween( 2, 20 );
		layout.magnetize();


		if( layout.magnet.on ) {

			// Create a new shape.
			var shape = new fiveleft.Shape()
				,shapeSize = round(layout.viewport.area.width * randomBetween( 0.2, 0.8 ));

			shape.width = shapeSize;
			shape.height = shapeSize;
			shape.setCenter( layout.magnet.target.getCenter() );
			shape.build();

			aCtx.drawImage( shape.canvas, 0, 0, shape.width, shape.height, shape.x, shape.y, shape.width, shape.height );

		}


	}





	function handleLoadQueueEvent( event )
	{
		switch( event.type )
		{
			case "complete" : 
				shapeBuilder.patternSprite = new fiveleft.SpriteSheet( assetQueue.getItem("sprite-patterns").tag, 5, 5 );
				shapeBuilder.blobSprite = new fiveleft.SpriteSheet( assetQueue.getItem("sprite-blobs").tag, 4, 4 );
				shapeBuilder.splatterSprite = new fiveleft.SpriteSheet( assetQueue.getItem("sprite-splatters").tag, 4, 3 );
				shapeBuilder.ready();
				break;
			case "error" : break;
			case "fileload" : break;
		}
	}


	// --------------------------------------------------------------------
	// Canvas Managing Methods
	// --------------------------------------------------------------------


	function createCanvases( canvas )
	{
		displayCanvas = dCvs = canvas;
		viewportCanvas = vCvs = document.createElement("canvas");
		artworkCanvas = aCvs = document.createElement("canvas");
		renderingCanvas = rCvs = document.createElement("canvas");

		// Set the Canvas sizes
		dCvs.width = vCvs.width = rCvs.width = window.innerWidth;
		dCvs.height = vCvs.height = rCvs.height = window.innerHeight;
		rCvs.width = aCvs.width = layout.artwork.area.width;
		rCvs.height = aCvs.height = layout.artwork.area.height;

		// Context References	
		dCtx = dCvs.getContext("2d");
		vCtx = vCvs.getContext("2d");
		aCtx = aCvs.getContext("2d");
		rCtx = rCvs.getContext("2d");

		log( dCvs );
	}


	function drawToArtwork() 
	{

		//TODO: turn off for now
		// brush.add( layout.artworkPosition );
		// brush.render();
		// aCtx.drawImage( rCvs, 0, 0 );
		aCtx.drawImage( brush.canvas, 0, 0 );
	}


	/**
	 * Draw to DisplayCanvas is the visible output of the artwork seen by the user.
	 *  - the DisplayCanvas needs to be cleared because the ArtworkCanvas contains alpha
	 *  - the Source Position uses the renderPosition to determine what to copy from the ArtworkCanvas
	 *  - the Source position is manipulated by the parallaxOffset 
	 * @return null
	 */
	function drawToDisplay()
	{
		var src = layout.artwork.source
			,dest = layout.render.area


		// Run a quick check to make sure the source is there
		if( src.width < 320 || src.height < 320 ) {
			log( " no source rect ");
			return ;
		}


		// Clear the display canvas and ensure its size.
		if( dCvs.width !== layout.viewport.area.width || dCvs.height !== layout.viewport.area.height ) {
			dCvs.width = layout.viewport.area.width;
			dCvs.height = layout.viewport.area.height;
		}else{
			dCtx.clearRect( 0, 0, layout.viewport.area.width, layout.viewport.area.height );
		}
		// Draw the artwork canvas onto the Display Canvas
		dCtx.drawImage( aCvs, src.x, src.y, src.width, src.height, dest.x, dest.y, dest.width, dest.height );
	
		// If we are in intro state, draw to the intro canvas
		if( introState ) {
			// log( "DrawingAPI::drawToDisplay introState = " + introState );
			if( !introMask.complete ) return;
			dCtx.globalCompositeOperation = "destination-in";
			// dCtx.globalAlpha = 0.3;
			dCtx.drawImage( introMask, 0, 0, introMask.width, introMask.height, dest.x, dest.y, dest.width, dest.height );
			// dCtx.globalAlpha = 1;
			dCtx.globalCompositeOperation = "source-over";
		}
	}


	/**
	 * Draw Guides displays any guides on top of the display canvas
	 * @return null
	 */
	function drawGuides()
	{
		var vW = window.innerWidth
			,vH = window.innerHeight;

		if( vCvs.width !== vW || vCvs.height !== vH ) {
			vCvs.width = vW;
			vCvs.height = vH;
		}else{
			vCtx.clearRect( 0, 0, vW, vH );
		}

		vCtx.globalAlpha = controller.guidesAlpha;

		if( controller.showParallaxArea ) {

			var uiRect = layout.parallax.uiRect;

			vCtx.beginPath();
			vCtx.moveTo( 0, 0 ); // Outer rectangle
			vCtx.lineTo( vW, 0 );
			vCtx.lineTo( vW, vH );
			vCtx.lineTo( 0, vH );
			vCtx.lineTo( 0, 0 );
			vCtx.moveTo( uiRect.l, uiRect.t ); // Inner rectangle (punchout)
			vCtx.lineTo( uiRect.l, uiRect.b );
			vCtx.lineTo( uiRect.r, uiRect.b );
			vCtx.lineTo( uiRect.r, uiRect.t );
			vCtx.lineTo( uiRect.l, uiRect.t );
			vCtx.fillStyle = "rgba( 255, 0, 0, 0.5 )";
			vCtx.fill();
			vCtx.closePath();
		}

		if( controller.showPoints ) {

			if( !rpts.created ) {
				rpts.user = new fiveleft.RegPoint( "rgb(255,0,127)", 12, 2 );
				rpts.idleTarget = new fiveleft.RegPoint( "rgb(0,0,127)", 10, 2 );
				rpts.idlePosition = new fiveleft.RegPoint( "rgb(0,0,255)", 10, 2 );
				rpts.deviceMotion = new fiveleft.RegPoint( "rgb(0,0,0)", 40, 8 );
				rpts.context = vCtx;
				rpts.created = true;
			}

			// Update RegPoint Positions
			rpts.deviceMotion.copy( device.motion.target ).draw( rpts.context );
			rpts.user.copy( userPosition ).draw( rpts.context );
			// rpts.idleTarget.copy( layout.idleMotion.position.target ).draw( rpts.context );
			rpts.idlePosition.copy( layout.idleMotion.position ).draw( rpts.context );
		}

		if( controller.showComposition ) {

			layout.renderAreas();

			var scale = Math.min( compositionDisplay.width/layout.artwork.area.width, compositionDisplay.height/layout.artwork.area.height )
				,cdW = round( scale * layout.artwork.area.width )
				,cdH = round( scale * layout.artwork.area.height )
				,cdX = layout.viewport.area.width - cdW - 10
				,cdY = layout.viewport.area.height - cdH - 10;

			vCtx.beginPath();
			vCtx.rect( cdX, cdY, cdW, cdH );
			vCtx.fillStyle = "rgba(255,255,255,0.8)";
			vCtx.fill();
			vCtx.lineWidth = 1;
			vCtx.strokeStyle = "rgba(0,0,0,0.2)";
			vCtx.stroke();
			vCtx.closePath();
			vCtx.drawImage( layout.canvas, 0, 0, layout.artwork.area.width, layout.artwork.area.height, cdX, cdY, cdW, cdH );
			vCtx.drawImage( artworkCanvas, 0, 0, layout.artwork.area.width, layout.artwork.area.height, cdX, cdY, cdW, cdH );
		}

		// Finally, draw the guides onto the display
		dCtx.drawImage( vCvs, 0, 0 );
	}

	// --------------------------------------------------------------------
	// UI Event Handlers
	// --------------------------------------------------------------------


	function applyEventListeners( apply )
	{
		var applyFtn = !apply ? "removeEventListener" : "addEventListener"
			,onOff = !apply ? "off" : "on";

		$("body")
			[onOff]( "mousedown", handleUserStart )
			[onOff]( "mousemove", handleUserMove )
			[onOff]( "mouseup mouseleave", handleUserEnd )
			[onOff]( "touchend touchcancel touchstart touchmove", handleUserTouch );

		ticker[applyFtn]( "tick", _api.tick );
	}

	function handleUserStart( e ) 
	{
		if( e.type == "touchstart" ) {
			log( e.type );
		}
		touchActive = false;
		return e;
		// var touch = e.type == "touchstart"
		// 	,x = touch ? e.originalEvent.changedTouches[0].clientX : e.clientX
		// 	,y = touch ? e.originalEvent.changedTouches[0].clientY : e.clientY;

		// _api.setUserPosition( x, y );
		// userActive = true;
		// brush.start( layout.artworkPosition );
	}

	function handleUserEnd( e )
	{
		if( e.type == "touchend" ) {
			log( e.type );
		}
		touchActive = false;
		return e;
		// var touch = e.type == "touchend"
		// 	,x = touch ? e.originalEvent.changedTouches[0].clientX : e.clientX
		// 	,y = touch ? e.originalEvent.changedTouches[0].clientY : e.clientY;

		// _api.setUserPosition( x, y );
		// userActive = false;
		// brush.end( layout.artworkPosition );
	}

	function handleUserMotion( e ) 
	{
		var acc = e.originalEvent.acceleration;
		device.motion.target.set( acc.x, acc.y, acc.z );
	}

	function handleUserOrientation( e ) 
	{
		var evt = e.originalEvent;
		device.orientation.target.set( evt.beta, evt.gamma, evt.alpha );
	}

	function handleUserMove( e )
	{
		if( touchActive ) {
			// log(" touch is active - cancel move event "); 
			return;
		}

		var touch = e.type == "touchmove"
			,x = touch ? e.originalEvent.changedTouches[0].clientX : e.clientX
			,y = touch ? e.originalEvent.changedTouches[0].clientY : e.clientY;

		// Update position
		_api.setUserPosition( x, y );
		// userActive = true;
		touchActive = false;
	}

	function handleUserTouch( e )
	{
		// log( "DrawingAPI::handleUserTouch " + e.type );
		touchActive = true;// = e.type === "touchstart";
	}



	// --------------------------------------------------------------------
	// DAT.GUI Controller
	// --------------------------------------------------------------------

	function setController() 
	{
		if( controller !== null ) return controller;

		// Controller
		var c;


		c = {
			showGuides : true
			,showParallaxArea : false
			,showComposition : true
			,showPoints : false
			,guidesAlpha : 1
			,intro : true
			,play : true
			// ,fps : _FPS || 30	
			,_fps : { min:5, max:60, step:5 }
			,onPlay : function() {
				_api[ (c.play) ? "start" : "stop" ]();
			}
			,onIntro : function() {
				_api[ (c.intro) ? "toIntro" : "fromIntro" ]();
			}
			// ,onFPS : function() {
			// 	ticker.setFPS( c.fps );
			// }
			,onShowComposition : function() {
				layout.render = c.showComposition;
			}
			,onToggleSpacebar : function( e ) {
				if( e.keyCode == 32 ) {
					c.play = !c.play;
					c.onPlay();
				}
			}
		};

		c.gui = new dat.GUI({autoPlace:false});

		var parallaxFolder = c.gui.addFolder("Parallax Motion");
		parallaxFolder.add( layout.parallax, "uiRectScale" ).min(0.1).max(0.8).step(0.1).onChange( function(){
			layout.parallax.uiRect.scaleRect( layout.viewport, layout.parallax.uiRectScale );
		});
		parallaxFolder.add( layout.parallax, "friction" ).min(0.005).max(0.8).onChange( function(){
			layout.parallax.offset.friction.set().addScalar( layout.parallax.friction );
		});

		var idleFolder = c.gui.addFolder("Idle Motion");
		idleFolder.add( layout.idleMotion, "bleed" ).min(-30).max(180).step(30);
		idleFolder.add( layout.idleMotion, "moveAmt" ).min(10).max(200).step(19);
		idleFolder.add( layout.idleMotion, "angleVariation").min(5).max(60).step(5);
		// renderFolder = c.gui.addFolder( "Rendering" );
		// renderFolder.add( c, "renderAlpha" ).min(0).max(1).step(0.05);

		var guidesFolder = c.gui.addFolder( "Guides" );
		guidesFolder.add( c, "showGuides" );
		guidesFolder.add( c, "showPoints" );
		guidesFolder.add( c, "showParallaxArea" );
		guidesFolder.add( c, "showComposition" ).onChange( c.onShowComposition );
		guidesFolder.add( c, "guidesAlpha" ).min(0.1).max(1).step(0.1);

		var playbackFolder = c.gui.addFolder( "Playback" );
		playbackFolder.add( c, "play" ).onChange( c.onPlay ).listen();
		playbackFolder.add( c, "intro" ).onChange( c.onIntro ).listen();
		// playbackFolder.add( c, "fps" ).min( c._fps.min ).max( c._fps.max ).step( c._fps.step ).onChange( c.onFPS );
		playbackFolder.open();
		

		// Controller uses the spacebar to play/pause
		$(window).on( 'keypress', c.onToggleSpacebar );
		

		// Add Controller to DOM
		$("#dat-gui").append( c.gui.domElement );
		$("#dat-gui .close-button").trigger("click");
		
		return c;
	}


	// --------------------------------------------------------------------
	// Class & Namespace Definition
	// --------------------------------------------------------------------

	fiveleft.DrawingAPI = DrawingAPI;





	// HELPER CLASSES
	
	function Timer() 
	{
		var _timer = this
			,delayMin = 1000
			,delayMax = 3000;

		this.startAt = 0;
		this.pausedAt = 0;
		this.elapsed = 0;
		this.seconds = 0;
		this.nextDelay = 0;


		function getDelayTime() {
			return round( randomBetween( delayMin, delayMax ) );
		}		

		this.start = function() 
		{
			_timer.startAt = Date.now();
			_timer.nextDelay = getDelayTime();
		};
		this.update = function() 
		{
			_timer.elapsed = Date.now() - _timer.startAt;
			_timer.seconds = Math.floor( _timer.elapsed / 1000 );

			if( _timer.elapsed > _timer.nextDelay ) { 
				_timer.nextDelay = getDelayTime() + _timer.elapsed; 
				_timer.onDelayComplete();
			}
		};
		this.stop = function() {
			_timer.pausedAt = Date.now();
		};
		this.onDelayComplete = function() {
			log( "Timer::onDelayComplete - time: " + _timer.seconds );
		};
	}




}($);
