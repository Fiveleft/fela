
!function($){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;


	var sb = null
		,isReady = false
		,colorPalette = [];



	/** 
	 * ShapeBuilder
	 * @param {Image} img - loaded Image Element
	 * @param {int} cols Sprite Sheet columns
	 * @param {int} rows Sprite Sheet rows
	 */
	function ShapeBuilder() 
	{
		sb = this;

		// Properties
		this.blobSprite = null;
		this.patternSprite = null;
		this.splatterSprite = null;

		// Methods
		this.ready = ready;
		// this.build = build;
	}


	function Shape()
	{
		this._cacheRect = new fiveleft.Rectangle();
		this.offset = new fiveleft.Vector();
		this.canvas = document.createElement("canvas");
		this.renderCanvas = document.createElement("canvas");
		this.pieces = [];

		this.build = shape_build;
	}
	Shape.prototype = new fiveleft.Rectangle();
	Shape.constructor = Shape;
	fiveleft.Shape = Shape;




	function ready() 
	{

	}


	var patList = [ 1,2,10,11,23 ];
	var patInd = 0;
	var getPattIndex = function( ) {
		var newInd = patInd%patList.length
		patInd ++;
		return patList[newInd];
	}

	var colList = [ 
		new fiveleft.Color( 0, randomBetween(100,150), randomBetween(200,255))
		,new fiveleft.Color( 0, randomBetween(100,250), randomBetween(200,255))
		,new fiveleft.Color( 0, randomBetween(100,255), randomBetween(220,255))
		,new fiveleft.Color( 0, randomBetween(50,255), randomBetween(220,255))
	];
	var colInd = 0;
	var getCol = function( ) {
		var newInd = colInd%colList.length
		colInd ++;
		return colList[newInd];
	}

	function shape_build()
	{
		log( "pattern: " + getPattIndex() );

		var ctx = this.canvas.getContext("2d")
			,rCtx = this.renderCanvas.getContext("2d")
			,s1 = buildBlob()
			,c1 = getCol().desaturate(0.1)
			,s2 = buildSplatter( null, 0.5 )
			,s2Scale = Math.min( this.width/s2.width, this.height/s2.height )
			,s3 = buildBlob( null, 1.25 )
			,s3Scale = Math.min( this.width/s3.width, this.height/s3.height )
			,c2 = getCol().darken( randomBetween(-0.9,0.3) ).desaturate(0)//fiveleft.Color.random( 80, 180 ).desaturate(0)
			,p1 = ctx.createPattern( buildPattern( getPattIndex() ), "repeat" )
			,p2 = ctx.createPattern( buildPattern( getPattIndex() ), "repeat" )
			,maxW = Math.max( s1.width, s2.width )
			,maxH = Math.max( s1.height, s2.height )
			,regPoint = new fiveleft.RegPoint()
			,rot = toRad( randomBetween(0, 360) )
			,rotRect = new fiveleft.Rectangle( this.x, this.y, s1.width, s1.height );

		rotRect = fiveleft.Rectangle.getRotatedBoundry( rotRect, rot );
		this.set( this.center.x-(rotRect.width/2), this.center.y-(rotRect.height/2), rotRect.width, rotRect.height ).round();

		this.canvas.width = this.renderCanvas.width = this.width;
		this.canvas.height = this.renderCanvas.height = this.height;



		// * Draw the size of the shape including the rotation *
		// ctx.beginPath();
		// ctx.rect( 0, 0, this.width, this.height );
		// ctx.fillStyle = "rgba(0,0,0,0.1)";
		// ctx.fill();
		// ctx.closePath();

		// this.setCenter( this.center );

		// ctx.globalCompositeOperation = "source-over";

		//* Shape 1 */
		// // Fill blob 1 onto pattern/color 1
		ctx.save();
		ctx.translate( this.width/2, this.height/2 );
		ctx.rotate( rot );
		ctx.drawImage( s1, -(s1.width/2), -(s1.height/2), s1.width, s1.height );
		ctx.restore();

		ctx.globalCompositeOperation = "source-atop";
		ctx.rect( 0, 0, this.width, this.height );
		ctx.fillStyle = c1.getRGBA();
		ctx.fill();

		// Fill with pattern 1
		ctx.globalCompositeOperation = "destination-in";
		ctx.save();
		ctx.translate( this.width/2, this.height/2 );
		ctx.rotate( toRad(randomBetween(0,360)) );
		ctx.rect( this.width/-2, this.height/-2, this.width, this.height );
		ctx.fillStyle = p1;
		ctx.fill();
		ctx.restore();


		// ctx.globalCompositeOperation = "source-over";
		// regPoint.x = this.width/2;
		// regPoint.y = this.height/2;
		// regPoint.draw( ctx );

		// return this;


		//* Shape 2 */
		// Fill pattern 2 onto pattern 1
		rCtx.drawImage( s3, 0, 0 );
		// rCtx.globalCompositeOperation = "destination-in";

		// Fill with pattern 2
		// rCtx.save();
		// rCtx.rotate = randomBetween( -90, 90 );
		rCtx.rect( 0, 0, this.width, this.height );
		rCtx.fillStyle = p2;
		rCtx.fill();
		// rCtx.restore();

		// // Fill color 2 onto pattern 2
		rCtx.globalCompositeOperation = "source-in";
		rCtx.fillStyle = c2.getRGBA();
		rCtx.fill();

		rCtx.globalCompositeOperation = "destination-in";
		rCtx.drawImage( s3, 0, 0 );

		// rCtx.drawImage( s2, 0, 0 );
		// rCtx.globalCompositeOperation = "destination-in";
		// // // rCtx.globalCompositeOperation = "destination-in";
		// rCtx.fillStyle = c2.getRGBA();
		// rCtx.fill();
		// rCtx.save();
		// rCtx.globalCompositeOperation = "destination-over";
		// rCtx.rotation = randomBetween( 0, 50 );
		// rCtx.drawImage( s3, 0, 0, s3.width, s3.height, 0, 0, round(s3.width*s3Scale), round(s3.height*s3Scale) );
		// rCtx.restore();
		
		// Draw Render Canvas to Display Canvas
		ctx.globalCompositeOperation = "source-atop";
		ctx.drawImage( this.renderCanvas, 0, 0 );

		return this;
	}
	

	
	// ------------------------------------------------------------------------------------------
	// Private Methods
	// ------------------------------------------------------------------------------------------
	

	function buildBlob( _id, _scale ) 
	{
		var id = _id||round(randomBetween(1, sb.blobSprite.cells))
			,scale = _scale||1;

		// log( "buildBlob [" + id + "] to scale:" + scale );
		return sb.blobSprite.drawSprite( id, null, scale );
	}


	function buildSplatter( _id, _scale ) 
	{
		var id = _id||round(randomBetween(1, sb.splatterSprite.cells))
			,scale = _scale||1;
		return sb.splatterSprite.drawSprite( id, null, scale );
	}


	function buildPattern( _id, _scale ) 
	{
		var id = _id||round(randomBetween(1, sb.patternSprite.cells))
			,scale = _scale||1;
		return sb.patternSprite.drawSprite( id, null, scale );
	}
	

	
	// ------------------------------------------------------------------------------------------
	// Application Namespace
	// ------------------------------------------------------------------------------------------
	
	fiveleft.ShapeBuilder = ShapeBuilder;


}($);