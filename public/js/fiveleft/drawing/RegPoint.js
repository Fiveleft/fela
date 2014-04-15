if( typeof fiveleft == "undefined" ) fiveleft = {};

!function(){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	// Manage Dependencies
	if( typeof fiveleft.Vector === "undefined" ) {
		throw new Error( "fiveleft.RegPoint extends the fiveleft.Vector object but could not find it (typically located at /fiveleft/core/Vector.js)" ); 
	};

	/* Classname Shortcut */
	var _cn = "RegPoint"
		,rp_pos = new fiveleft.Vector()
		,rp_cvs = document.createElement("canvas")
		,rp_ctx = rp_cvs.getContext("2d");



	/** 
	 * RegPoint Shape Consturctor
	 */
	function RegPoint( color, size, weight, ctx ) 
	{	
		// "private" var
		this._spritePos = new fiveleft.Vector();

		// public var
		this.color = color || "rgb(0,255,255)";
		this.size = size || 10;
		this.weight = weight || 2;
		this.context = ctx || null;

		// Create the Shape and add to the cache canvas
		create( this );

		this.setContext = regPoint_setContext;
		this.draw = regPoint_draw;
	}



	function create( rp )
	{
		rp._spritePos.x = rp_pos.x;

		var cX = rp._spritePos.x + rp.size
			,cY = rp._spritePos.y + rp.size;

		// log( "creating rp on shape canvas at ", cX, ",", cY  );
		rp_ctx.save();
		rp_ctx.translate( cX, cY );

		// Draw Circle
		rp_ctx.beginPath();
		rp_ctx.arc( 0, 0, rp.size-1, 0, 2*Math.PI, false);
		rp_ctx.fillStyle = "rgba(255,255,255,0.5)";
		rp_ctx.fill();
		rp_ctx.strokeStyle = "rgba(0,0,0,0.5)";
		rp_ctx.lineWidth = 1;
		rp_ctx.stroke();
		rp_ctx.closePath();

		// Draw Crosshair
		rp_ctx.beginPath();
		rp_ctx.moveTo( -(rp.size>>1), 0 );
		rp_ctx.lineTo( (rp.size>>1), 0 );
		rp_ctx.moveTo( 0, -(rp.size>>1) );
		rp_ctx.lineTo( 0, (rp.size>>1) );
		rp_ctx.strokeStyle = rp.color;
		rp_ctx.lineWidth = rp.weight;
		rp_ctx.stroke();
		rp_ctx.closePath();

		rp_ctx.restore();
		rp_pos.x += rp.size*2;
	}

	function regPoint_setContext ( context )
	{
		this.context = context;
		return this;
	}  

	function regPoint_draw ( context )
	{
		var ctx = context || this.context;
		if( ctx === null ) throw new Error( "fiveleft.RegPoint needs a context to draw itself to" );
		ctx.drawImage( rp_cvs, this._spritePos.x, this._spritePos.y, this.size*2, this.size*2, this.x-this.size, this.y-this.size, this.size*2, this.size*2 );
		return this;
	}

	RegPoint.prototype = new fiveleft.Vector();
	RegPoint.constructor = RegPoint;
	fiveleft.RegPoint = RegPoint;


}();