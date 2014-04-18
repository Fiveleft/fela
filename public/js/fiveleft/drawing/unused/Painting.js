if( typeof fiveleft == "undefined" ) fiveleft = {};

(function(){

	var _ref

		// DOM Elements
		,body, canvasElement

		// Canvases and Contexts
		,cvs, cacheCvs, drawCvs, bgCvs, utilsCvs, fadeCvs
		,ctx, cacheCtx, drawCtx, bgCtx, utilsCtx, fadeCtx

		// Brush Instance
		,brush 

		// DAT.GUI Controller
		,controller

		// Settings
		,doRender = false
		,playing = false
		,initialized = false

		// Timer
		,timer = { time:0, start:0, update:function(){ timer.time = Date.now()-timer.start; } }

		,bgImg
		,bgPattern = "./img/chalkboard-gray-6.png"
		,bgSrc = "./img/wc-background-autumn.jpg";
		// ,bgSrc = "./img/wc-background-fr-grey.jpg";


	var FADE = {
			tick : 0
			,interval : 2000 
			,apply : false
		}
		,OUTPUT = {
			width : 2600//2925
			,height : 3800//4275
			,position : new fiveleft.Vector()
			,canvas : document.createElement("canvas")
			,context : null
		}
		,LAYOUT = { 
			width : 0
			,height : 0
			,scale : 1
			,center : new fiveleft.Vector()
		};

	/** 
	 * Painting Consturctor
	 * <p>Configure, define shortcuts and initialize</p>
	 * <p>Painting.js</p>
	 * @param element {DOMElement} - base DOMElement for component
	 */
	function Painting( canvas ) 
	{	
		_ref = this;
		this.init( canvas );
		initialized = true;
	}

	Painting.prototype = 
	{
		constructor : Painting

		, init : function( canvas ) 
		{

			// Elements
			body = $("body");
			canvasElement = canvas;

			// Set UI Component
			this.ui = new fiveleft.PaintingUI();
			this.ui.setOutput( OUTPUT );

			// Brush
			brush = new fiveleft.Brush();
			brush.setSize( OUTPUT.width, OUTPUT.height );

			// Set Canvases
			this.initCanvases();

			// Set initial size
			this.resize();

			// Set Brush Start Position
			brush.start( this.ui.position );

			// Setup
			this.loadImages();

			// Controller
			controller = setController();

			// Listeners
			$(window).on({
				resize : this.resize
				,keypress : this.togglePlay 
			});

			this.render();

			// Start
			if( controller.play ) this.start();
		}

		, initCanvases : function()
		{
			cvs = canvasElement[0];
			cacheCvs = document.createElement("canvas");
			bgCvs = document.createElement("canvas");
			fadeCvs = document.createElement("canvas");
			drawCvs = document.createElement("canvas");
			utilsCvs = document.createElement("canvas");
			cvs.width = utilsCvs.width = window.innerWidth;
			cvs.height = utilsCvs.height = window.innerHeight;

			OUTPUT.canvas.width = OUTPUT.width;
			OUTPUT.canvas.height = OUTPUT.height;

			fadeCvs.width = bgCvs.width = drawCvs.width = cacheCvs.width = OUTPUT.width;
			fadeCvs.height = bgCvs.height = drawCvs.height = cacheCvs.height = OUTPUT.height;

			OUTPUT.context = OUTPUT.canvas.getContext("2d");
			ctx = cvs.getContext("2d");
			cacheCtx = cacheCvs.getContext("2d");
			bgCtx = bgCvs.getContext("2d");
			fadeCtx = fadeCvs.getContext("2d");
			drawCtx = drawCvs.getContext("2d");
			utilsCtx = utilsCvs.getContext("2d");
		}

		, start : function() 
		{
			playing = true;

			timer.start = Date.now();
			createjs.Ticker.setFPS(controller.fps);
			createjs.Ticker.addEventListener( "tick", this.tick );
			doRender = true;

			this.ui.start();
		}

		, stop : function() 
		{
			playing = false;
			doRender = false;
			createjs.Ticker.removeEventListener( "tick", this.tick );
			this.ui.stop();
		}

		, tick : function() 
		{
			timer.update();
			FADE.apply = Math.floor(timer.time/FADE.interval) !== FADE.tick;
			if( doRender ) _ref.render();
		}

		, render : function() 
		{
			// Update UI to get position
			this.ui.update();

			// Add new Brush Position
			brush.add( this.ui.position );
			brush.render();

			if( FADE.apply ) {

				// Update Fade Ticks
				FADE.tick = Math.floor(timer.time/FADE.interval);

				// Clear the Fade Canvas
				fadeCtx.clearRect(0, 0, OUTPUT.width, OUTPUT.height );

				// Draw the DrawCanvas to the Fade Canvas at the fade alpha
				fadeCtx.globalAlpha = 0.98;
				fadeCtx.drawImage( drawCvs, 0, 0 );

				// Clear the fade alpha and draw the latest Brush
				fadeCtx.globalAlpha = 1;
				fadeCtx.drawImage( brush.canvas, 0, 0 );

				// Clear the Draw Canvas and Draw the updated Fade Canvas to it.
				drawCtx.clearRect( 0, 0, OUTPUT.width, OUTPUT.height );		
				drawCtx.drawImage( fadeCvs, 0, 0 );

			}else{

				// No fade, just simply draw brush to the canvas
				drawCtx.drawImage( brush.canvas, 0, 0 );
			}

			ctx.drawImage( bgCvs, this.ui.viewport.x, this.ui.viewport.y, LAYOUT.width, LAYOUT.height, 0, 0, LAYOUT.width, LAYOUT.height );
			ctx.drawImage( drawCvs, this.ui.viewport.x, this.ui.viewport.y, LAYOUT.width, LAYOUT.height, 0, 0, LAYOUT.width, LAYOUT.height );

			// Draw Utility Items
			if( controller.showGuides ){
				this.ui.renderHitArea( ctx );
				this.ui.renderRegPoints( ctx );
			}
		}

		, loadImages : function()
		{
			bgImg = new Image();
			bgImg.onload = function() {
				createBackground();
			};
			bgImg.src = bgSrc;
		}

		, exportImage : function()
		{
			//OUTPUT.context.clearRect( 0, 0, OUTPUT.width, OUTPUT.height );
			OUTPUT.context.drawImage( bgCvs, 0, 0 );
			OUTPUT.context.drawImage( drawCvs, 0, 0 );
			return OUTPUT.canvas.toDataURL('image/jpeg', 1);
		}


		// --------------------------------------------------------------------
		// Event Handlers
		// --------------------------------------------------------------------

		, resize : function()
		{
			LAYOUT.width = window.innerWidth;
			LAYOUT.height = window.innerHeight;
			LAYOUT.scale = Math.max( LAYOUT.width/OUTPUT.width, LAYOUT.height/OUTPUT.height );
			LAYOUT.center.x = LAYOUT.width*0.5;
			LAYOUT.center.y = LAYOUT.height*0.5;

			_ref.ui.setViewPort( LAYOUT );

			cvs.width = utilsCvs.width = LAYOUT.width;
			cvs.height = utilsCvs.height = LAYOUT.height;

			if( !playing && initialized ) _ref.render();
		}

		, togglePlay : function( e )
		{
			if( e.keyCode == 32 ) {
				//_ref[(playing ? "stop" : "start")]();
				controller.play = !controller.play;
				controller.onPlay();
			}
		}
	};

	// --------------------------------------------------------------------
	// Create Methods
	// --------------------------------------------------------------------
	

	function createBackground() 
	{
		// var pattern = bgCtx.createPattern( bgImg, 'repeat' );
		// bgCtx.rect( 0, 0, bgCvs.width, bgCvs.height );
		// bgCtx.fillStyle = pattern;
		// bgCtx.fill();
		bgCtx.drawImage( bgImg, 0, 0, bgCvs.width, bgCvs.height );


			// Start
			if( controller.play ) _ref.start();
	}


	// --------------------------------------------------------------------
	// Controller
	// --------------------------------------------------------------------
	
	function setController() {

		// Controller
		var c = {

			showGuides : false
			,play : true
			,onPlay : function() {
				_ref[ (c.play) ? "start" : "stop" ]();
			}

			,fps : 60	
			,fpsMin: 1
			,fpsMax : 60
			,fpsStep : 1
			,onFPS : function() {
				createjs.Ticker.setFPS( c.fps );
			}

		};

		c.gui = new dat.GUI({autoPlace:false});
		c.gui.add( c, "showGuides" );
		c.gui.add( c, "fps" ).min( c.fpsMin ).max( c.fpsMax ).step( c.fpsStep ).onChange( c.onFPS );
		c.gui.add( c, "play" ).onChange( c.onPlay ).listen();

		// Add Controller to DOM
		$(".dat-gui").append( c.gui.domElement );
		return c;
	}


	// --------------------------------------------------------------------
	// Class & Namespace Definition
	// --------------------------------------------------------------------
	
	fiveleft.Painting = Painting;


})();
