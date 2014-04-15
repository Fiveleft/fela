if( typeof fiveleft == "undefined" ) fiveleft = {};

(function(){

	var _ref;


	var OUTPUT = {
			width : 2600
			,height : 3800
			,position : new fiveleft.Vector()
		}
		,VIEWPORT = {
			width : 0
			,height : 0
			,center : new fiveleft.Vector()
			,bleed : 40
		}
		,HIT_AREA = {
			size : 0.2
			,color : new fiveleft.Color( 255, 0, 0 )
			,rect : { l:0, r:0, t:0, b:0 }
			,render : false
		}
		,MOVE = {
			acc : new fiveleft.Vector()
			,vel : new fiveleft.Vector()
			,pos : new fiveleft.Vector()
			,speed : new fiveleft.Vector() 
			,scrollArea : new fiveleft.Vector()
			,attractor : new fiveleft.Vector() 
		}
		,IDLE = { 
			acc : new fiveleft.Vector()
			,vel : new fiveleft.Vector()
			,pos : new fiveleft.Vector()
			,angle : 0
			,friction : 0.1
			,fritcionSV : null
			,angleVariation : 50
			,movesViewPort : true
			,correcting : false
			,vFlag : false
			,hFlag : false
		}
		,USER = { 
			acc : new fiveleft.Vector()
			,vel : new fiveleft.Vector()
			,pos : new fiveleft.Vector()
			,friction:0.7
		}
		,USER_IDLE = { 
			acc : new fiveleft.Vector()
			,vel : new fiveleft.Vector()
			,pos : new fiveleft.Vector()
		}
		,ATTRACTOR = {
			acc : new fiveleft.Vector()
			,vel : new fiveleft.Vector()
			,pos : new fiveleft.Vector()
			,friction : 1
		}
		,ENGAGEMENT = {
			ratio : 0
			,interval : 0.025
			,ease : easeInOutCubic
			,value : 0
			,user : false
		}
		,TARGET = {
			pos : new fiveleft.Vector()
		}
		,REGPOINT = {
			user : null
			,userIdle : null
			,attractor : null
			,idle : null
		};


	function PaintingUI( options ) 
	{	
		_ref = this;
		this.config = $.extend( true, this.defaults, options||{} );
		this.init();
	}

	PaintingUI.prototype = {

		constructor : PaintingUI

		, defaults : {
			renderHitArea : true
			,renderRegPoints : true
		}

		, position : null
		, viewport : null
		, useTouch : false


		, init : function() 
		{
			this.body = $("body");
			this.useTouch = this.body.hasClass("touch");

			// Set Viewport
			this.setViewPort( {width:window.innerWidth, height:window.innerHeight} );

			// Set IDLE position to somewhere random
			IDLE.angle = randomBetween(0, 360);
			IDLE.pos.x = randomBetween(0, VIEWPORT.width);
			IDLE.pos.y = randomBetween(0, VIEWPORT.height);
			USER_IDLE.pos.copy( IDLE.pos );
			USER.pos.copy( IDLE.pos );
			ATTRACTOR.pos.copy( IDLE.pos );

			// Set SineValues
			IDLE.frictionSV = new fiveleft.SineValue(0, {min:0.15, max:0.45, stepAmount:0.003});
			IDLE.velocitySV = new fiveleft.SineValue(0, {min:60, max:120});

			// Set Position 
			this.position = fiveleft.Vector.clone( ATTRACTOR.pos );
			this.position.add( MOVE.pos );

			// Create Registration Points if set in configuration
			if( this.config.renderRegPoints ) 
			{
				REGPOINT.user = new fiveleft.RegPoint( "rgb(255,0,127)", 12, 2 );
				REGPOINT.userIdle = new fiveleft.RegPoint( "rgb(101,101,101)", 12, 2 );
				REGPOINT.attractor = new fiveleft.RegPoint( "rgb(0,255,127)", 12, 2 );
				REGPOINT.idle = new fiveleft.RegPoint( "rgb(51, 51, 255)", 12, 2 );
			}
		}

		, update : function() 
		{
			updateViewPortPosition();
			updateIdle();
			updateAttractor();

			// Set the position
			this.position.addVectors( MOVE.pos, TARGET.pos );
		} 

		, start : function()
		{
			setEventListeners(true);
		}

		, stop : function()
		{
			setEventListeners(false);
		}

		, setViewPort : function( viewport ) 
		{
			VIEWPORT.width = viewport.width;
			VIEWPORT.height = viewport.height;
			VIEWPORT.center.x = VIEWPORT.width * 0.5;
			VIEWPORT.center.y = VIEWPORT.height * 0.5;

			// Update HitArea box
			HIT_AREA.rect.l = VIEWPORT.width * HIT_AREA.size;
			HIT_AREA.rect.t = VIEWPORT.height * HIT_AREA.size;
			HIT_AREA.rect.r = VIEWPORT.width - HIT_AREA.rect.l;
			HIT_AREA.rect.b = VIEWPORT.height - HIT_AREA.rect.t;

			// Update ScrollArea
			MOVE.scrollArea.x = OUTPUT.width - VIEWPORT.width;
			MOVE.scrollArea.y = OUTPUT.height - VIEWPORT.height;

			// Update ViewPort Position
			updateViewPortPosition();

			// Finally, set the instance's viewport
			this.viewport = VIEWPORT;
		}

		, setOutput : function( output ) 
		{
			this.output = OUTPUT = output;

			// Update ScrollArea
			MOVE.scrollArea.x = OUTPUT.width - VIEWPORT.width;
			MOVE.scrollArea.y = OUTPUT.height - VIEWPORT.height;
		}

		, setController : function( c )
		{
			c.guidesFolder = c.gui.addFolder( "Visual Guides" );
			c.guidesFolder.add( c.guides, "show" );
			c.guidesFolder.add( LAYOUT_MOVE, "drawHitArea" );
			c.guidesFolder.add( LAYOUT_MOVE, "hitSize" ).min( 0.05 ).max( 0.45 ).step( 0.05 ).onChange( _ref.resize );

		}

		, renderHitArea : function( ctx ) 
		{
			drawHitArea( ctx );
		}

		, renderRegPoints : function( ctx )
		{
			if( _ref.config.renderRegPoints ) {
				drawRegPoints( ctx );
			}
		}
	};



	function updateAttractor()
	{
		switch( true )
		{
			case ENGAGEMENT.user && ENGAGEMENT.ratio < 1 :
				ENGAGEMENT.ratio += ENGAGEMENT.interval;
				ENGAGEMENT.value = ENGAGEMENT.ease(ENGAGEMENT.ratio);
				TARGET.pos.interpolateVectors( IDLE.pos, USER.pos, ENGAGEMENT.value );
				break;

			case !ENGAGEMENT.user && ENGAGEMENT.ratio > 0 :
				ENGAGEMENT.ratio -= ENGAGEMENT.interval;
				ENGAGEMENT.value = ENGAGEMENT.ease(ENGAGEMENT.ratio);
				TARGET.pos.interpolateVectors( IDLE.pos, USER_IDLE.pos, ENGAGEMENT.value );
				break;

			case ENGAGEMENT.user && ENGAGEMENT.ratio >= 1 :
				ENGAGEMENT.ratio = 1;
				TARGET.pos.copy( USER.pos );
				break;

			case !ENGAGEMENT.user && ENGAGEMENT.ratio <= 0 :
				ENGAGEMENT.ratio = 0;
				TARGET.pos.copy( IDLE.pos );
				break;
		}

		ATTRACTOR.friction = IDLE.friction + ((USER.friction-IDLE.friction) * ENGAGEMENT.ease(ENGAGEMENT.ratio));
		//log( ATTRACTOR.friction.toFixed(3), IDLE.friction, USER.friction, engRat.toFixed(3) );

		// Reset Attractor Accelearation
		ATTRACTOR.acc
			.set()
			.addScalar( ATTRACTOR.friction );

		// Attractor Velocity
		ATTRACTOR.vel
			.subtractVectors( TARGET.pos, ATTRACTOR.pos )
			.multiply( ATTRACTOR.acc );

		// Update Attractor Position
		ATTRACTOR.pos
			.add( ATTRACTOR.vel );
	}


	function updateIdle()
	{
		// TEMP
		// var oa = IDLE.angle;

		// Idle SV updated
		IDLE.velocitySV.step();
		IDLE.frictionSV.step();
		IDLE.friction = IDLE.frictionSV.value;

		// Reset Acceleration to Acceleration SV
		IDLE.acc
			.set()
			.addScalar( IDLE.friction );

		// Idle Velocity set to Idle SV
		IDLE.vel.x = Math.cos( toRad(IDLE.angle) ) * IDLE.velocitySV.value;
		IDLE.vel.y = Math.sin( toRad(IDLE.angle) ) * IDLE.velocitySV.value;
		IDLE.vel.multiply( IDLE.acc );
		
		// Idle Position updated with IdleVelocity
		IDLE.pos.add( IDLE.vel );

		IDLE.hFlag = !isBetween( IDLE.pos.x, -VIEWPORT.bleed, VIEWPORT.width+(2*VIEWPORT.bleed) );
		IDLE.vFlag = !isBetween( IDLE.pos.y, -VIEWPORT.bleed, VIEWPORT.height+(2*VIEWPORT.bleed) );

	
		switch( true )
		{
			// IDLE was correcting and has corrected
			case IDLE.correcting && !IDLE.hFlag && !IDLE.vFlag :
				IDLE.correcting = false;
				break;

			case !IDLE.correcting && IDLE.hFlag && IDLE.vFlag : 
				//IDLE.angle = IDLE.pos.angleTo(VIEWPORT.center);
				IDLE.angle = toDeg( VIEWPORT.center.angleTo( IDLE.pos ) );//(IDLE.angle<0) ? IDLE.angle+180 : IDLE.angle-180; // ? toDeg( LAYOUT.center.angleTo(IDLE.pos) );
				IDLE.pos.interpolateTo( VIEWPORT.center, 0.2 );
				IDLE.correcting = true;
				log( "[vFlag,hFlag] new position: " + IDLE.pos.toString(0) + " new angle: " + IDLE.angle.toFixed(0) );
				break;

			case !IDLE.correcting && IDLE.hFlag :
				IDLE.angle = 180-IDLE.angle;
				IDLE.correcting = true;
				// log( "[hFlag] old angle:" + oa.toFixed(0) + " new angle: ", IDLE.angle.toFixed(0)  );
				break;

			case !IDLE.correcting && IDLE.vFlag :
				IDLE.angle = -IDLE.angle;
				IDLE.correcting = true;
				// log( "[vFlag] old angle:" + oa.toFixed(0) + " new angle: ", IDLE.angle.toFixed(0)  );
				break;

			// IDLE is correcting
			case IDLE.correcting :

				IDLE.vel.x = clamp( IDLE.pos.x, 0, VIEWPORT.width );
				IDLE.vel.y = clamp( IDLE.pos.y, 0, VIEWPORT.height );
				IDLE.angle = toDeg( IDLE.pos.angleTo(IDLE.vel) );
				IDLE.pos.copy( IDLE.vel );
				IDLE.correcting = false;
				log( " is correcting [" + IDLE.pos.toString(0) + "] angle:" + IDLE.angle.toFixed(0) )
				break;

			// Idle Angle randomized if inside boundries
			default :
				IDLE.correcting = false;
				//log( " angle: ", IDLE.angle.toFixed(0), " to center: " + toDeg(ca).toFixed(0) )
				break; 
		}

		if( !IDLE.correcting ) {
			IDLE.angle += randomAround( IDLE.angleVariation );
			IDLE.angle = (IDLE.angle>360) ? IDLE.angle%360 : IDLE.angle;
		}
	}


	function updateViewPortPosition() 
	{
		var moveAmtX, moveAmtY, activePos;

		// The active Position to use for moving the viewport
		activePos = (IDLE.movesViewPort && !ENGAGEMENT.user) ? TARGET.pos : USER_IDLE.pos;

		// Determine Horiz/Vert move speed
		MOVE.speed.x = 
				inRange( activePos.x, 0, HIT_AREA.rect.l ) ? -ratioBetween( activePos.x, HIT_AREA.rect.l, 0 ) : 
				inRange( activePos.x, HIT_AREA.rect.r, VIEWPORT.width ) ? ratioBetween( activePos.x, HIT_AREA.rect.r, VIEWPORT.width ) :
				!inRange( activePos.x, 0, VIEWPORT.width ) ? ((activePos.x<0) ? -1 : 1) :
				0;
		MOVE.speed.y = 
				inRange( activePos.y, 0, HIT_AREA.rect.t ) ? -ratioBetween( activePos.y, HIT_AREA.rect.t, 0 ) : 
				inRange( activePos.y, HIT_AREA.rect.b, VIEWPORT.height ) ? ratioBetween( activePos.y, HIT_AREA.rect.b, VIEWPORT.height ) :
				!inRange( activePos.y, 0, VIEWPORT.height ) ? ((activePos.y<0) ? -1 : 1) :
				0;

		moveAmtX = (MOVE.speed.x < 0) ? MOVE.pos.x : MOVE.scrollArea.x - MOVE.pos.x;
		moveAmtY = (MOVE.speed.y < 0) ? MOVE.pos.y : MOVE.scrollArea.y - MOVE.pos.y;

		moveAmtX = Math.min( moveAmtX*0.35, 100 );
		moveAmtY = Math.min( moveAmtY*0.35, 100 );

		MOVE.attractor.x = MOVE.pos.x + (moveAmtX * MOVE.speed.x);
		MOVE.attractor.y = MOVE.pos.y + (moveAmtY * MOVE.speed.y);
	
		MOVE.acc
			.set()
			.addScalar( 0.25 );

		MOVE.vel
			.subtractVectors( MOVE.attractor, MOVE.pos )
			.multiply( MOVE.acc );

		// Set the Move Position
		MOVE.pos.add( MOVE.vel );

		// Update Viewport X,Y
		VIEWPORT.x = MOVE.pos.x;
		VIEWPORT.y = MOVE.pos.y;
		this.viewport = VIEWPORT;
	}


	// --------------------------------------------------------------------
	// Draw/Render Methods
	// --------------------------------------------------------------------
	
	function drawHitArea( context )
	{
		var _ctx = context;
		HIT_AREA.color.alpha = ratioOf( Math.max(Math.abs(MOVE.speed.x), Math.abs(MOVE.speed.y)), 0.2, 0.8 );

		// Do the Drawing
		_ctx.beginPath();
		_ctx.moveTo( 0, 0 );
		_ctx.lineTo( VIEWPORT.width, 0 );
		_ctx.lineTo( VIEWPORT.width, VIEWPORT.height );
		_ctx.lineTo( 0, VIEWPORT.height );
		_ctx.lineTo( 0, 0 );
		_ctx.moveTo( HIT_AREA.rect.l, HIT_AREA.rect.t );
		_ctx.lineTo( HIT_AREA.rect.l, HIT_AREA.rect.b );
		_ctx.lineTo( HIT_AREA.rect.r, HIT_AREA.rect.b );
		_ctx.lineTo( HIT_AREA.rect.r, HIT_AREA.rect.t );
		_ctx.lineTo( HIT_AREA.rect.l, HIT_AREA.rect.t );
		_ctx.fillStyle = HIT_AREA.color.getRGBA();
		_ctx.fill();
		_ctx.closePath();
	}

	function drawRegPoints( context )
	{
		if( !REGPOINT.created ) {
			REGPOINT.user = new fiveleft.RegPoint( "rgb(255,0,127)", 12, 2 );
			REGPOINT.userIdle = new fiveleft.RegPoint( "rgb(101,101,101)", 12, 2 );
			REGPOINT.attractor = new fiveleft.RegPoint( "rgb(0,255,127)", 12, 2 );
			REGPOINT.idle = new fiveleft.RegPoint( "rgb(51, 51, 255)", 12, 2 );
			REGPOINT.created = true;
		}


		// Update RegPoint Positions
		REGPOINT.attractor.position.copy( ATTRACTOR.pos );
		REGPOINT.user.position.copy( USER.pos );
		REGPOINT.idle.position.copy( IDLE.pos );
		REGPOINT.userIdle.position.copy( USER_IDLE.pos );

		// Draw
		REGPOINT.userIdle.draw( context );
		REGPOINT.idle.draw( context );
		REGPOINT.attractor.draw( context );
		if( ENGAGEMENT.user ) REGPOINT.user.draw( context );
	}

	// --------------------------------------------------------------------
	// Event Handlers
	// --------------------------------------------------------------------
	

	function setEventListeners( add ) 
	{
		var fn = add===false ? "off" : "on";

		if( _ref.useTouch ){
			_ref.body[fn]({
				touchmove : handleUserMove
				,touchstart : handleUserStart
				,touchend : handleUserEnd
			});
		}else{
			_ref.body[fn]({
				mousemove : handleUserMove
				,mousedown : handleUserStart
				,mouseup : handleUserEnd
				,mouseleave : handleUserEnd
			});
		}
	}

	function handleUserMove( e ) 
	{
		if( ENGAGEMENT.user ) USER.pos.set( e.pageX, e.pageY );
		USER_IDLE.pos.set( e.pageX, e.pageY );
	}

	function handleUserStart( e ) 
	{
		_ref.body.addClass( "noSelect" );
		ENGAGEMENT.user = true;
		USER.pos.set( e.pageX, e.pageY );
	}

	function handleUserEnd( e )
	{
		_ref.body.removeClass( "noSelect" );
		ENGAGEMENT.user = false;
		USER.pos.set( e.pageX, e.pageY );
	}


	// --------------------------------------------------------------------
	// Class & Namespace Definition
	// --------------------------------------------------------------------
	fiveleft.PaintingUI = PaintingUI;


})();


