
(function(){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;


	var _ref
		,artworkWidth = 2200
		,artworkHeight = 3900
		,rows = 0
		,cols = 0
		,offsetMaxCols = 0
		,offsetMaxRows = 0
		,maxOffsetRatio = 0.25
		,scrollRatio = 0

		,compositionCanvas = document.createElement("canvas")
		,renderCanvas = document.createElement("canvas")
		,introState = true
		,heatMapRendered = false
		,state = null // 'magnetized' | 'paused' | 'idle'

		/* New idea 'run idle' */
		,runIdle = false

		,animation = {
			isAnimating : false
			,toIntro : {
				ease : Cubic.easeInOut
				,time : 0.5
			}
			,toFull : {
				ease : Expo.easeOut
				,time : 0.5
			}
		}
		,units = {
			width : 0
			,height : 0
			,count : 0
			,max : 300
			,list : []
			,linkItem : null
		}
		,hotspots = {
			thirds : []
			,current : null
			,map : {}
			,list : []
			,count : 0
			,maxRatio : 0.4
			,minRatio : 0.2
			,topLeft : null
			,topRight : null
			,botRight : null
			,botLeft : null
			,thirdsOffsetRatio : Expo.easeIn.getRatio
			,offsetRatio : Sine.easeIn.getRatio
		}
		,idle = {
			magnetized : false
			,position : new fiveleft.MotionVector()
			,area : new fiveleft.Rectangle()
			,angle : 0
			,angleCorrection : false
			,angleVariation : 20
			,bleed : 80
			,moveAmt : 100
			,moveViewport : true
			,hFlag : false
			,vFlag : false
			,intro : {
				angleVariation : 70
				,moveAmt : 280
			}
		}
		,magnet = {
			target : null
			,on : false
		}
		,parallax = {
			area : new fiveleft.Rectangle()
			,areaScale : 1.25
			,uiRect : new fiveleft.Rectangle()
			,uiRectScale : 0.4
			,offset : new fiveleft.MotionVector()
			,friction : 0.05
		}
		,artwork = {
			area : new fiveleft.Rectangle( 0, 0, artworkWidth, artworkHeight )
			,position : new fiveleft.Vector()
		}
		,render = {
			area : new fiveleft.Rectangle()
			,source : new fiveleft.Rectangle()
			,dest : new fiveleft.Rectangle()
			,offset : new fiveleft.MotionVector()
			,targetElement : null
			,targetPosition : new fiveleft.Vector()
		}
		,viewport = {
			area : new fiveleft.Rectangle( 0, 0, window.innerWidth, window.innerHeight )
			,boundry : new fiveleft.Rectangle( 0, 0, (artworkWidth-window.innerWidth), (artworkHeight-window.innerHeight))
			,centerOffset : new fiveleft.Vector()
			,scrollRatio : 0
		};


	/** 
	 * Composition Layout
	 */
	var CompositionLayout = function() 
	{
		_ref = this;

		// Objects for DrawingAPI usage
		this.artwork = artwork;
		this.viewport = viewport;
		this.render = render;

		// Vectors
		this.userPosition = viewport.area.getCenter().clone();
		this.artworkPosition = artwork.position;

		// intro.element = $("canvas.hero-canvas");
		this.introState = true;
		this.doRender = true;
		this.canvas = document.createElement("canvas");


		// TEMPORARY
		this.badAngle = false;



		// timer.onDelayComplete = function() {
		// 	magnet.on = !magnet.on;
		// 	// log("timer delay complete -  magnet: ", magnet.on );
		// };

		// Idle Posiiton - runs when composition is magnetized
		idle.position.copy( this.userPosition );
		idle.position.friction.set().addScalar(0.1);
		idle.position.onUpdate = idlePosition_onUpdate;
		this.idleMotion = idle;

		// Parallax
		parallax.offset.friction.set().addScalar( parallax.friction );
		parallax.offset.onUpdate = parallaxOffset_onUpdate;
		this.parallax = parallax;

		// Render Area MotionVector
		render.offset.friction.set().addScalar( 0.25 );
		render.offset.onUpdate = renderOffset_onUpdate;

		// IF we're dealing with a device that demands a smaller size, scale the artwork down:
		if( fiveleft.applicationData.isiOS ) {
			var artworkScale = 5000000 / artwork.area.getArea();
			artwork.area.scaleRect( artwork.area, artworkScale ).round();
		}

		// Measurements
		measureLayout();
		createHotSpots();


		// Functions
		this.renderAreas = renderAreas;
		this.renderHeatMap = renderHeatMap;
		this.animateToFull = animateToFull;
		this.animateToIntro = animateToIntro;

		this.magnetize = magnetize;
		
		this.start = start;
		this.stop = stop;
		this.update = update;
		this.handleEvent = update;

		this.setIntro = setIntro;
		this.setScrollRatio = setScrollRatio;
		this.setRenderCenter = setRenderCenter;
		this.setRenderTarget = setRenderTarget;
		this.setSize = setSize;
		this.setUserPosition = setUserPosition;
	};


	// --------------------------------------------------------------------
	// !!! THE UPDATE FUNCTION !!!
	// --------------------------------------------------------------------


	/**
	 * Update Timer, Positions, and Calculate Artwork Render Area
	 * @return {[type]} [description]
	 */
	function update()
	{
		// Do the updates if the animation is not running
		if( !animation.isAnimating ) {
			parallax.offset.update();
			// idle.position.update();
		}
		

		if( runIdle && magnet.on && !animation.isAnimationg ) {
			idle.position.update();
		}

		artwork.position
			.addVectors( idle.position, viewport.area.getTopLeft() )
			.add( parallax.offset );

		// Render source combines viewport position, render area, parallax offset
		render.source
			.copy( render.area )
			.setPosition( render.area.x+viewport.area.x+parallax.offset.x, render.area.y+viewport.area.y+parallax.offset.y );
	}


	function magnetize()
	{
		magnet.on = !magnet.on;




		if( magnet.on ) {

			var lastHotSpot = hotspots.current;
			hotspots.current = getHotspotInRenderBoundry()



			// log( "CompositionLayout::magnetize" );
			// nextHotSpot.log()
		}
	}


	function start()
	{
		// log( "CompositionLayout::start() " );
		// timer.start = createjs.Ticker.getTime( true );
		// timer.elapsed = 0;
		// timer.nextDelay = timer.getDelayTime() + timer.elapsed;
		// createjs.Ticker.addEventListener( "tick", this );
	}


	function stop()
	{
		// log( "CompositionLayout::stop() " );
		// timer.pausedAt = createjs.Ticker.getTime( true );
		// createjs.Ticker.removeEventListener( "tick", this );
	}


	// --------------------------------------------------------------------
	// Cached Functions
	// --------------------------------------------------------------------


	function setScrollRatio( value ) 
	{
		if( !introState ) {
			scrollRatio = value;
			viewport.area.y = ( scrollRatio * viewport.boundry.height );
		}
	}

	function setSize( w, h ) 
	{
		var vW = w||window.innerWidth
			,vH = h||window.innerHeight
			,vbW = artwork.area.width - vW
			,vbH = artwork.area.height - vH
			,tX = 0
			,tY = 0
			,tW = vW
			,tH = vH
			,_log = false;

		// Viewport boundry : area in which the viewport can move
		viewport.boundry.setSize( vbW, vbH );

		// Viewport area : the width/height of the view into the artwork
		viewport.area.setSize( vW, vH );

		// Viewport Position - use the scroll area, unless a render target position is set.
		if( render.usePosition ) {
			viewport.area.setCenter( render.targetPosition );
			viewport.area.x = clamp( viewport.area.x, viewport.boundry.l, viewport.boundry.r );
			viewport.area.y = clamp( viewport.area.y, viewport.boundry.t, viewport.boundry.b );
			viewport.centerOffset.subtractVectors( render.targetPosition, viewport.area.getCenter() ).round();
		}else{
			viewport.area.setPosition( (artwork.area.width-vW)*0.5, (vbH * scrollRatio) ).round();
			viewport.centerOffset.set();
		}

		// IF we have a render.targetPosition defined, set the render.area to its boundries.
		if( render.useTarget ) {
			tX = render.targetElement.offset().left;
			tY = render.targetElement.offset().top;
			tW = render.targetElement.width();
			tH = render.targetElement.height();
		}
		render.area.set( tX, tY, tW, tH ).round();

		// Parallax UIRect is the trigger area that parallax-es the artwork
		parallax.uiRect.scaleRect( viewport.area, parallax.uiRectScale );
		parallax.uiRect.setPosition( parallax.uiRect.x-viewport.area.x, parallax.uiRect.y-viewport.area.y ).round();

		// Parallax Area is the boundry in which we can parallax the artwork within the viewport.
		if( render.useTarget ) {
			parallax.area.setPosition( (vW*(1-parallax.areaScale)*0.5), (vH*(1-parallax.areaScale)*0.5) );
			parallax.area.setSize( parallax.area.x * -2, parallax.area.y * -2 ).round();
		}else{
			parallax.area.x = 0;
			parallax.area.width = vbW;
		}

		if( _log ) {	
			log( "***\nCompositionLayout::setSize(" + w + ", " + h + ")" );
			log( "\tviewport.area = ", viewport.area.toString() );
			log( "\tviewport.boundry = ", viewport.boundry.toString() );
			log( "\tviewport.centerOffset = ", viewport.centerOffset.toString() );
			log( "\trender.area = ", render.area.toString() );
			log( "\tparallax.area = ", parallax.area.toString() );
			log( "\tparallax.uiRect = ", parallax.uiRect.toString() );
			log( "***" );
		}
	}

	function setUserPosition( v ) 
	{
		this.userPosition.copy( v );
		// artwork.position.addVectors( this.userPosition, render.area.getTopLeft() );
		artwork.position.addVectors( idle.position, render.area.getTopLeft() );
	}

	function setIntro( cvs )
	{
		// log( "CompositionLayout::setIntro" );
		introState = true;
		introCanvas = $(cvs);
		hotspots.current = hotspots.thirds[0].unit;
		_ref.setRenderCenter( hotspots.current.getCenter() );
		_ref.setRenderTarget( introCanvas );
		_ref.setSize();
	}

	function setRenderCenter( vector )
	{
		if( !vector ) {
			render.usePosition = false;
		}else{
			render.usePosition = true;
			render.targetPosition.copy(vector);
		}
		// log( "CompositionLayout::setRenderCenter" );
		// log( "\trender.targetPosition:", render.targetPosition.toString() );
	}

	function setRenderTarget( element )
	{
		if( !element ) {
			render.useTarget = false;
			render.targetElement = null;
		}else{
			render.useTarget = true;
			render.targetElement = $(element);
		}
		// log( "CompositionLayout::setRenderTarget" );
		// log( "\trender.targetElement:", render.useTarget );
	}


	// --------------------------------------------------------------------
	// Cached Functions
	// --------------------------------------------------------------------


	
	function measureLayout() 
	{
		var maxVUnits = Math.floor( Math.sqrt( units.max * artwork.area.getAspectRatio()) )
			,maxHUnits = Math.floor( Math.sqrt( units.max / artwork.area.getAspectRatio()) )
			,i 
			,cu
			,col
			,row;

		units.width = round( artwork.area.width / maxHUnits );
		units.height = round( artwork.area.height / maxVUnits );
		rows = Math.floor( artwork.area.height / units.height );
		cols = Math.floor( artwork.area.width / units.width );
		units.count = cols * rows;
		units.list = new Array(units.count);


		// Max offset amounts when picking an offset from any specific unit
		offsetMaxCols = round( cols*maxOffsetRatio );
		offsetMaxRows = round( rows*maxOffsetRatio );

		// Max Targets
		hotspots.count = round( units.count * randomBetween( hotspots.maxRatio, hotspots.minRatio ) );


		// Create Linked List of CompositionUnits
		for( i=units.count-1; i!==-1; i-- )
		{
			row = Math.floor( i/cols );
			col = i % cols;
			cu = new CompositionUnit( i, col, row );
			cu.set( cu.col*units.width, cu.row*units.height, units.width, units.height );
			cu.next = units.linkItem; //(i < units-1) ? units.list[ i+1 ] : null;
			units.linkItem = cu;
			units.list[i] = cu;
		}
	}


	function createHotSpots() 
	{		
		var third = null
			,offsetUnit
			,thirdsIndex = 0;	

		// The units at the "rule of thirds" positions
		hotspots.topLeft = getUnitByCoord( Math.floor(cols/3)-1, Math.floor(rows/3)-1 );
		hotspots.topRight = getUnitByCoord( Math.ceil(2*(cols/3)), Math.floor(rows/3)-1 );
		hotspots.botLeft = getUnitByCoord( Math.floor(cols/3)-1, Math.ceil(2*(rows/3)) );
		hotspots.botRight = getUnitByCoord( Math.ceil(2*(cols/3)), Math.ceil(2*(rows/3)) );

		hotspots.thirds = new Array(4);
		hotspots.thirds[0] = { unit:hotspots.topLeft, cluster:[] };
		hotspots.thirds[1] = { unit:hotspots.topRight, cluster:[] };
		hotspots.thirds[2] = { unit:hotspots.botLeft, cluster:[] };
		hotspots.thirds[3] = { unit:hotspots.botRight, cluster:[] };
		hotspots.thirds.sort( shuffle );
		
		// Here we figure out how many random blocks we pick around each unitThird
		for( i=hotspots.count-1; i!==-1; i-- ) 
		{
			thirdsIndex = round( ratioOf( hotspots.thirdsOffsetRatio(Math.random()), 0, 3 ) );
			third = hotspots.thirds[thirdsIndex];
			offsetUnit = getOffsetUnit( third.unit );

			if( hotspots.map[ "_" + offsetUnit.index ] === undefined ){
				hotspots.map[ "_" + offsetUnit.index ] = true;
				offsetUnit.hotspotIndex = hotspots.list.length;
				hotspots.list.push( offsetUnit );
				third.cluster.push( offsetUnit );
			}
		}
		hotspots.count = hotspots.list.length;
	}



	// --------------------------------------------------------------------
	// Rendering/Display Methods
	// --------------------------------------------------------------------



	function renderHeatMap()
	{
		if( heatMapRendered ) return;

		var cvs = this.canvas
			,ctx = cvs.getContext("2d")
			,compCvs = compositionCanvas
			,compCtx = compCvs.getContext("2d")
			,rCvs = renderCanvas
			,rCtx = rCvs.getContext("2d");

		cvs.width = rCvs.width = compCvs.width = artwork.area.width;
		cvs.height = rCvs.height = compCvs.height = artwork.area.height;
		
		compCtx.rect( 0, 0, artwork.area.width, artwork.area.height );
		compCtx.fillStyle = "rgba(255,255,255,1)";
		compCtx.fill();

		// Render Canvas creates the heatmap block
		rCtx.rect( 0, 0, units.width, units.height );
		rCtx.fillStyle = "rgba(0,0,0,0.8)";
		rCtx.fill();

		for( i=hotspots.list.length-1; i!==-1; i-- ) 
		{
			cu = hotspots.list[i];
			compCtx.drawImage( rCvs, 0, 0, units.width, units.height, cu.x, cu.y, units.width, units.height );
		}
		// Clear the render canvas
		rCtx.clearRect( 0, 0, units.width, units.height );

		for( i=3; i!==-1; i-- ) 
		{
			cu = hotspots.thirds[i].unit;
			compCtx.beginPath();
			compCtx.rect( cu.x, cu.y, units.width, units.height );
			compCtx.fillStyle = "rgba(0,250,0,0.8)";
			compCtx.fill();
			compCtx.closePath();
		}

		// Finally, clear the render canvas
		heatMapRendered = true;
	}


	var areaColors = {
		viewport : new fiveleft.Color( 0, 127, 255, 1 )
		,artwork : new fiveleft.Color( 0, 0, 0, 0.25 )
		,parallax : new fiveleft.Color( 255, 255, 51, 0.8 )
		,render : new fiveleft.Color( 255, 0, 0, 0.8 )
		,hotspot : new fiveleft.Color(0,0,0,1)
	};


	/**
	 * Render the Layout Areas used for calculation
	 * @return {Canvas DOMElement} 
	 */
	function renderAreas()
	{
		var cvs = this.canvas
			,ctx = cvs.getContext("2d")
			,compCvs = compositionCanvas
			,aa = artwork.area
			,va = viewport.area
			,vOff = viewport.centerOffset
			,pa = parallax.area
			,pOff = parallax.offset
			,ra = render.area;


		if( !heatMapRendered ) this.renderHeatMap();

		// Line Width must be thick
		ctx.lineWidth = 15;

		// Draw the Composition HeatMap
		ctx.drawImage( compCvs, 0, 0 );

		// Draw the Artwork Rectangle
		ctx.beginPath();
		ctx.moveTo( aa.l, aa.t ); 
		ctx.lineTo( aa.r, aa.t ); 
		ctx.lineTo( aa.r, aa.b ); 
		ctx.lineTo( aa.l, aa.b ); 
		ctx.lineTo( aa.l, aa.t ); 
		// Punch out the Viewport Rectangle;
		ctx.moveTo( va.r, va.t );
		ctx.lineTo( va.l, va.t ); 
		ctx.lineTo( va.l, va.b ); 
		ctx.lineTo( va.r, va.b ); 
		ctx.lineTo( va.r, va.t );
		ctx.fillStyle = areaColors.artwork.getRGBA();
		ctx.fill();
		ctx.closePath();

		// Draw the Viewport
		ctx.beginPath();
		ctx.rect( va.x, va.y, va.width, va.height );
		ctx.strokeStyle = areaColors.viewport.getRGBA();
		ctx.stroke();
		ctx.closePath();

		// Draw the Parallax Area
		ctx.beginPath();
		ctx.rect( (va.x+ra.x+vOff.x)+pa.x, (va.y+ra.y+vOff.y)+pa.y, pa.width, pa.height );
		ctx.fillStyle = ctx.strokeStyle = areaColors.parallax.getRGBA();
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		// Draw the Render Area
		ctx.beginPath();
		ctx.rect( (va.x+ra.x+vOff.x)+pOff.x, (va.y+ra.y+vOff.y)+pOff.y, ra.width, ra.height );
		ctx.fillStyle = ctx.strokeStyle = areaColors.render.getRGBA();
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		// Draw the HOTSPOT
		if( hotspots.current !== null ) {
			ctx.beginPath();
			ctx.rect( hotspots.current.x, hotspots.current.y, hotspots.current.width, hotspots.current.height );
			ctx.fillStyle = areaColors.hotspot.getRGBA();
			ctx.fill();
			ctx.strokeStyle = "rgb(255,0,127)";
			ctx.stroke();
			ctx.closePath();
		}
		
		return this.canvas;
	}


	// --------------------------------------------------------------------
	// Intro/Animation Methods
	// --------------------------------------------------------------------


	function animateToFull()
	{
		// Turn off intro state
		introState = false;

		// Set animating state for any pausing needed
		animation.isAnimating = true;

		// Move target position to center of artwork
		render.targetPosition.x = artwork.area.getCenter().x;

		// Animate the viewport area to the horizontal center of the artwork
		TweenLite.to( viewport.area, animation.toFull.time, {
			x : round((artwork.area.width-viewport.area.width)*0.5)
			,ease : animation.toFull.ease
		});

		// Animate the render area to the full viewport area
		TweenLite.to( render.area, animation.toFull.time, {
			x : 0
			,y : 0
			,width : viewport.area.width
			,height : viewport.area.height
			,ease : animation.toFull.ease
			,onComplete : animateToFullComplete
		});
	}
	function animateToFullComplete() 
	{
		// 
		_ref.setRenderTarget( null );
		introState = false;
		_ref.setSize();
		animation.isAnimating = false;
		//
	}

	function animateToIntro()
	{
		// log( "CompositionLayout::animateToIntro" );
		_ref.setRenderCenter( thirds[0].unit.getCenter() );
		_ref.setRenderTarget( introCanvas );
		animation.isAnimating = true;

		TweenLite.to( render.area, animation.toIntro.time, {
			x : render.targetElement.offset().left
			,y : render.targetElement.offset().top
			,width : render.targetElement.width()
			,height : render.targetElement.height()
			,ease : animation.toIntro.ease
			,onComplete : animateToIntroComplete
		});
	}
	function animateToIntroComplete() 
	{
		// log( "CompositionLayout::animateToIntroComplete" );
		animation.isAnimating = false;
		introState = true;
	}


	// --------------------------------------------------------------------
	// MotionVector 'onUpdate' methods
	// --------------------------------------------------------------------

	function renderOffset_onUpdate()
	{
	}


	/**
	 * IdlePosition 'onUpdate' method called after 'update' method called onto the MotionVector
	 * @scope {MotionVector} this is idle.position instance of MotionVector
	 */
	function idlePosition_onUpdate()
	{
		// idle.velocityVariance.update();
		// idle.frictionVariance.update();

		var bleed = introState ? 0 : idle.bleed
			,bleedX = bleed + (parallax.area.width/2)
			,bleedY = bleed + (parallax.area.height/2)
			,moveAmt = introState ? idle.intro.moveAmt : idle.moveAmt
			,aVariation = introState ? idle.intro.angleVariation : idle.angleVariation
			,offsetX = idle.position.x - parallax.offset.x
			,offsetY = idle.position.y - parallax.offset.y;
		
		// Flag if the position is outside of the bleed area
		idle.hFlag = !isBetween( offsetX, render.area.l-bleedX, render.area.r+bleedX );
		idle.vFlag = !isBetween( offsetY, render.area.t-bleedY, render.area.b+bleedY );

		// if( idle.angleCorrection ) {
		// 	idle.angleCorrection = (idle.hFlag || idle.vFlag);
		// }else {
		// }
		// 
		idle.angleCorrection = (!idle.angleCorrection && (idle.hFlag || idle.vFlag));

		idle.angle = (!idle.angleCorrection) ? idle.angle += randomAround( toRad(aVariation) )
					:(idle.hFlag && idle.vFlag) ? false
					:(idle.hFlag) ? Math.PI-idle.angle 
					:(idle.vFlag) ? -idle.angle
					:idle.angle;

		// log( " idle : vFlag=" + idle.vFlag + " hFlag=" + idle.hFlag );			
		if( idle.angle === false ) {
			// log( " bad angle - ", oldAngle.toFixed(2) )
			_ref.badAngle = true;
			idle.angle = 0;
			idle.position.target.copy( render.area.getCenter() );
		}else{
			_ref.badAngle = false;
			idle.position.target.x = Math.cos( idle.angle ) * moveAmt;
			idle.position.target.y = Math.sin( idle.angle ) * moveAmt;
			idle.position.target.add( idle.position );
		}
	}


	/**
	 * ParallaxOffset 'onUpdate' method called after 'update' method called onto the MotionVector
	 * @scope {MotionVector} this is parallax.offset instance of MotionVector
	 */
	function parallaxOffset_onUpdate()
	{
		var vr = viewport.area
			,up = _ref.userPosition
			,ur = parallax.uiRect
			,tX = 0
			,tY = 0
			,P = this;

		tX =
			inRange( up.x, ur.l, ur.r ) ? 0 :
			inRange( up.x, 0, ur.l ) ? -ratioBetween( up.x, ur.l, 0 ) :  
			inRange( up.x, ur.r, vr.width ) ? ratioBetween( up.x, ur.r, vr.width ) : 
			(up.x<vr.l ? -1 : 1);
		tY = 
			inRange( up.y, ur.t, ur.b ) ? 0 :
			inRange( up.y, 0, ur.t ) ? -ratioBetween( up.y, ur.t, 0 ) :  
			inRange( up.y, ur.b, vr.height ) ? ratioBetween( up.y, ur.b, vr.height ) : 
			(up.y<vr.t ? -1 : 1);

		P.target.x = tX * (parallax.area.width/2);
		P.target.y = tY * (parallax.area.height/2);
	}


	// --------------------------------------------------------------------
	// Helper Functions
	// --------------------------------------------------------------------


	function getUnitByCoord( col, row )
	{
		var index = (row*cols) + col;
		return (typeof units.list[index] !== "undefined") ? units.list[index] : null;
	}

	function getOffsetUnit( uc ) 
	{
		var offsetC = eitherOr(-1,1) * round( ratioOf( hotspots.offsetRatio(Math.random()), 0, offsetMaxCols ) )
			,offsetR = eitherOr(-1,1) * round( ratioOf( hotspots.offsetRatio(Math.random()), 0, offsetMaxRows ) )
			,colOff = clamp( uc.col + offsetC, 0, cols-1 )
			,rowOff = clamp( uc.row + offsetR, 0, rows );

		// log( " applying offset ", offsetC, offsetR );
		return getUnitByCoord( colOff, rowOff );
	}

	function getHotspotInRenderBoundry()
	{
		var targetHotspot = null
			,targetIndex = (hotspots.current !== null) ? hotspots.current.hotspotIndex : 0
			,i = hotspots.count-1
			,hIndex
			,hSpot;

		while( targetHotspot === null && i !== -1 ) 
		{
			hIndex = (i+targetIndex) % hotspots.count;
			hSpot = hotspots.list[hIndex];
			targetHotspot = ( viewport.area.getIntersects( hSpot.getCenter() ) ) ? hSpot : null;
			i--;
		}
		// log( "CompositionLayout::getHotspotInRenderBoundry, found target at index (" + (i+1) + ")" );
		return targetHotspot;
	}


	// --------------------------------------------------------------------
	// Class & Namespace Definition
	// --------------------------------------------------------------------

	fiveleft.CompositionLayout = CompositionLayout;


	/**
	 * [CompositionUnit description]
	 * @param {[type]} index [description]
	 * @param {[type]} col   [description]
	 * @param {[type]} row   [description]
	 */
	var CompositionUnit = function( index, col, row )
	{
		this.col = col;
		this.row = row;
		this.index = index;
		this.hotspotIndex = 0
		this.next = null;
		this.log = function(){
			log( "CUnit[" + this.index + "], col=" + this.col + 
				", row=" + this.row + ", rect=" + this.toString() );
		};
	};
	// CompositoinUnit extends Rectangle
	CompositionUnit.prototype = new fiveleft.Rectangle();
	CompositionUnit.constructor = CompositionUnit;
	

})();