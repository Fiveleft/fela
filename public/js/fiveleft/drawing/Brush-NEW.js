
!function(){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;


	var pointType = fiveleft.BrushPoint
		,pointCount = 20
		,minDistance = 5
		,curveDistance = 20;



	var fillColor = new fiveleft.Color( "FF0097", 0.1 );
	var strokeColor = fiveleft.Color.clone( fillColor );	





	/** 
	 * Brush Consturctor
	 * <p>Configure, define shortcuts and initialize</p>
	 * <p>Brush.js</p>
	 */
	var Brush = function( canvas ) 
	{
		this.canvas = canvas || document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.position = new fiveleft.Vector();
		this.angle = 0;
		this.state = 0; // 0=stopped, 1=beginning, 2=playing, 3=ending
		this.changed = false;

		var rCvs = document.createElement("canvas")
			,rCtx = rCvs.getContext("2d");

		this.info = {
			ticks : 0
			,points : []
			,renderCanvas : rCvs
			,renderContext : rCtx
			,renderArea : new fiveleft.Rectangle()
			,currentPosition : new fiveleft.Rectangle()
			,lastPosition : new fiveleft.Rectangle()
		};

		// Methods
		this.reset = brush_reset;
		this.getPlayState = brush_getPlayState;
		this.setAngle = brush_setAngle;
		this.setPosition = brush_setPosition; 
		this.setSize = brush_setSize;
		this.render = brush_render;
		this.renderTo = brush_renderTo;
		this.clear = brush_clear;
		this.start = brush_start;
		this.stop = brush_stop;

		// Realizations
		this.reset();
	};


	// --------------------------------------------------------------------
	// Cached Functions
	// --------------------------------------------------------------------


	function brush_reset ()
	{
		var info = this.info
			,i = pointCount-1;

		info.points = [];
		for( i; i!==-1; i-- ) {
			info.points.push( new pointType() );
		}
		return this;
	}



	function brush_getPlayState() 
	{

		return this.state;
	}



	function brush_setPosition( v )
	{
		var distance = v.distance( this.position )
			,angle = v.angleTo( this.position )
			,info = this.info
			,pts = info.points
			,i = info.points.length-1
			,point

		if( distance > minDistance ) {

			point = lastToFirst( this.info.points );
			point
				.set( v.x, v.y )
				.setThickness(10)
				.setAngle( angle )
				.bleedAmount = 1;

			this.position.copy(point);
		}

		for( i; i!==-1; i-- ) {
			pts[i].bleed().update();
		}

		if( pts[0].bleedAmount === pointType.bleedMax ) {
			this.changed = false;
		}else{
			this.changed = true;
		}

		return this;
	}


	function brush_setSize( w, h )
	{
		this.canvas.width = this.info.renderCanvas.width = w;
		this.canvas.height = this.info.renderCanvas.height = h;
	}

	function brush_setAngle( a )
	{
		lastAngle = this.angle;
		this.angle = a||this.angle;
		return this;
	}


	function brush_start()
	{
		this.state = 1;
		return this;
	}


	function brush_stop()
	{
		this.state = 0;
		return this;
	}


	function brush_render()
	{
		// if( !this.changed ) return false;

		var info = this.info
			,rCvs = info.renderCanvas
			,rCtx = info.renderContext
			,pts = info.points
			,ptNum = info.points.length
			,rW = rCvs.width
			,rH = rCvs.height
			,pt = pts[0]
			,i = 1;

		// Render context clears out
		rCtx.clearRect( 0, 0, rCvs.width, rCvs.height );
		rCtx.beginPath()

		for( i; i!==ptNum; i++ ) 
		{
			rCtx.moveTo( pt.v1.x, pt.v1.y );
			rCtx.lineTo( pts[i].v1.x, pts[i].v1.y );
			rCtx.lineTo( pts[i].v2.x, pts[i].v2.y );
			rCtx.lineTo( pt.v2.x, pt.v2.y );
			rCtx.lineTo( pt.v1.x, pt.v1.y );
			pt = pts[i];
		}

		rCtx.lineWidth = 1;
		rCtx.strokeStyle = strokeColor.getRGBA();
		rCtx.stroke();
		rCtx.fillStyle = fillColor.getRGBA();
		rCtx.fill();
		rCtx.closePath();

		// rCtx.rect( this.position.x, this.position.y, 200, 200 );
		// rCtx.fillStyle = fillColor.getRGBA();
		// rCtx.fill();

		this.changed = false;

		// boundry.set( this.position.x, this.position.y );
		// //
		// //
		// // this.context.beginPath();
		// this._rCtx.clearRect( 0, 0, this._rCvs.width, this._rCvs.height );
		// this._rCtx.beginPath();
		// this._rCtx.moveTo( pts[0].x, pts[0].y );



		// this._rCtx.lineTo( this.position.x, this.position.y+20 );
		// this._rCtx.strokeStyle = strokeColor.getRGBA();
		// this._rCtx.stroke();
		// this._rCtx.closePath();

		// this._rCtx.rect( this.position.x, this.position.y-20, this.position.x - lastPosition.x, 40 )
		// this._rCtx.fillStyle = fillColor.getRGBA();
		// this._rCtx.fill();
		// this._rCtx.closePath();
		
		// this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		this.context.drawImage( rCvs, 0, 0 );

		
		return this;
	}


	function brush_renderTo( ctx )
	{
		// this.clear();
		if( this.render() ); {
			ctx.drawImage( this.canvas, 0, 0, this.canvas.width, this.canvas.height );
		}				
		// this.context.clear();
		// this.context.drawImage( this.canvas, 0, 0, this.canvas.width, this.canvas.height );

		return this;
	}


	function brush_clear()
	{
		this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		this.info.renderContext.clearRect( 0, 0, this.info.renderCanvas.width, this.info.renderCanvas.height );
		return this;
	}


	// --------------------------------------------------------------------
	// Class & Namespace Definition
	// --------------------------------------------------------------------

	fiveleft.Brush = Brush;

}();


