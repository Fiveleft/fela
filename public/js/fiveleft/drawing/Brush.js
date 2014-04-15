if( typeof fiveleft === "undefined") fiveleft={};

(function(){
	
	// Static properties
	// var vNum = 3;
	// var angle = 0;
	// var radius = 0;
	// var curV = null; // current vector
	// var midVectors = [];

	var v, ctx, rctx, i;
	var newV, newH, oldV;
	var dist;
	var vNum = 4;



	function Brush( canvas )
	{
		if( !newH ) newH = new fiveleft.Vector();
		if( !newV ) newV = new fiveleft.Vector();
		this.init( canvas );
	}

	Brush.prototype = 
	{	
		constructor : Brush

		, vectors : []
		, canvas : null
		, renderCanvas : null
		, color : null
		, doRender : true
		, minDistance : 4
		, maxDistance : 500
		, skip : 1
		, angle : 0
		, thickness : 10
		, started : false
		, startTicks : 0
		, boundry : { x:0, y:0, width:1, height:1 }

		, init : function( canvas )
		{
			this.color = fiveleft.Color.random(50).desaturate(0);


			// Canvases
			this.canvas = canvas || document.createElement("canvas");
			this.renderCanvas = document.createElement("canvas");

			// Set canvases to window size
			this.canvas.width = this.renderCanvas.width = window.innerWidth;
			this.canvas.height = this.renderCanvas.height = window.innerHeight;

			// Set the position
			this.position = new fiveleft.Vector( round(this.canvas.width/2), round(this.canvas.height/2) );

			// Set up vectors
			this.vectors = new Array(vNum);
			this.vectors[0] = new fiveleft.BrushPoint();
			this.vectors[0].copy( this.position );

			for( i=vNum-1; i!==0; i-- ){
				this.vectors[i] = new fiveleft.BrushPoint();
				this.vectors[i].copy( this.position );
			}
		}

		, destroy : function()
		{
			this.vectors = null;
			return this;
		}

		, start : function( vector ) 
		{
			this.started = true;
			this.startTicks = 0;

			log( "Brush::start", vector.toString() );

			for( i=vNum-1; i!==-1; i-- ){
				this.vectors[i]
					.copy( vector )
					.update( this.angle, this.thickness );
			}
			// this.add( vector );
			return this;
		}

		, end : function( vector ) 
		{
			this.started = false;
			return this;
		}

		, add : function( vector )
		{
			if( this.startTicks < 2 ) {
				this.startTicks ++;
			}

			var d = vector.distance( this.vectors[0] )
				,a = vector.angleTo( this.vectors[0] );

			// Check Distance
			dist = vector.distance( this.vectors[0] );
			this.doRender = dist > this.minDistance;
			if( !this.doRender ) return;

			// Update Thickness
			// tsv.stepAmount = tStepSV.step();
			// this.thickness = tsv.step();

			// Find Angle
			this.angle = a;

			// New Handle is the mid-point of the new vector and last vector
			newH = lastToFirst( this.vectors );
			newH.interpolateVectors( vector, this.vectors[1], 0.5 )
				.update( this.angle, this.thickness );

			// New Vector is copied form the lastest addition
			newV = lastToFirst( this.vectors );
			newV.copy( vector )
				.update( this.angle, this.thickness );

			// Update the Old Vector with the angle from the new Handle
			oldV = this.vectors[2];
			oldV.angle = newH.angleTo( this.vectors[3] );
			return this;
		}

		, render : function()
		{
			if( !this.doRender ) return;

			v = this.vectors;
			ctx = this.canvas.getContext("2d");

			// Clear the previously drawn Brush mark in the from its boundry
			ctx.clearRect( this.boundry.x-3, this.boundry.y-3, this.boundry.width+6, this.boundry.height+6 ); 
			
			ctx.fillStyle = ctx.strokeStyle = this.color.getRGBA();
			// var sharpCut = false; //Math.abs( v[1].angleTo(v[3]) - this.angle ) >= 0.75; //(60 degrees)
			
			// Draw Stroke between fills
			ctx.beginPath();
			// ctx.moveTo( v[3].v1.x, v[3].v1.y );
			// ctx.lineTo( v[3].v2.x, v[3].v2.y );
			ctx.moveTo( v[1].v1.x, v[1].v1.y );
			ctx.lineTo( v[1].v2.x, v[1].v2.y );
			ctx.lineCap = "butt";
			ctx.lineWidth = 0.5;
			ctx.stroke();
			ctx.closePath();
			
			// Draw Color
			ctx.beginPath();
			ctx.moveTo( v[3].v1.x, v[3].v1.y );
			ctx.lineTo( v[3].v2.x, v[3].v2.y );
			ctx.quadraticCurveTo( v[2].v2.x, v[2].v2.y, v[1].v2.x, v[1].v2.y );
			ctx.lineTo( v[1].v1.x, v[1].v1.y );
			ctx.quadraticCurveTo( v[2].v1.x, v[2].v1.y, v[3].v1.x, v[3].v1.y );
			ctx.fill();
			ctx.closePath();

			this.setBoundry();

			return this;
		}

		, clear : function()
		{
			this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
			return this;
		}

		, setSize : function( width, height )
		{
			var rctx = this.renderCanvas.getContext("2d")
				,ctx = this.canvas.getContext("2d");

			// Clear Cache and draw existing canvas to it for preservation
			this.renderCanvas.width = width;
			this.renderCanvas.height = height;
			rctx.drawImage( this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height );

			// Resize canvas and redraw from the preserved cache.
			this.canvas.width = width;
			this.canvas.height = height;
			ctx.drawImage( this.renderCanvas, 0, 0 );

			return this;
		}

		, setBoundry : function()
		{
			var v, vMinX, vMinY, vMaxX, vMaxY, minX=null, maxX=null, minY=null, maxY=null;
			var i=this.vectors.length-1;

			for( i; i!==-1; i-- ){
				v = this.vectors[i];
				vMinX = (v.v1.x < v.v2.x) ? v.v1.x : v.v2.x;
				vMaxX = (v.v1.x < v.v2.x) ? v.v2.x : v.v1.x;
				vMinY = (v.v1.y < v.v2.y) ? v.v1.y : v.v2.y;
				vMaxY = (v.v1.y < v.v2.y) ? v.v2.y : v.v1.y;
				minX = (minX===null) ? vMinX : (minX<vMinX) ? minX : vMinX;
				minY = (minY===null) ? vMinY : (minY<vMinY) ? minY : vMinY;
				maxX = (maxX===null) ? vMaxX : (maxX>vMaxX) ? maxX : vMaxX;
				maxY = (maxY===null) ? vMaxY : (maxY>vMaxY) ? maxY : vMaxY;
			}
			// log( "min: " + minX.toFixed(2) + "," + minY.toFixed(2), "max: " + maxX.toFixed(2) + "," + maxY.toFixed(2) )
			this.boundry = { x:Math.floor(minX), y:Math.floor(minY), width:Math.ceil(maxX-minX), height:Math.ceil(maxY-minY) };
			return this;
		}
	};


	/**
	 * Create Super Class inheritance
	 */
	fiveleft.Brush = Brush;

})();


/* Old color shifts from render() method 


			// this.color.r = Math.round(redSV.step());
			// this.color.g = Math.round(greenSV.step());
			// this.color.b = Math.round(blueSV.step());
			// this.color.alpha = alphaSV.step();
			
			// tintColor
			// //	.copy( satColor ) 
			// 	.mixColors( this.color, mixColor, mixSV.step() )
			// 	//.saturate( 100 );
			// 	.darken( tintSV.step() )
*/

/* Old SineValue shifters - not used

	var tStepSV = new fiveleft.SineValue( 0, {min:0.0005, max:0.08, stepAmount:0.0005});
	var tsv = new fiveleft.SineValue( 100, {stepAmount:0.0005} );
	var redSV = new fiveleft.SineValue( 0, {min:127, max:255, stepAmount:0.004});
	var greenSV = new fiveleft.SineValue( 0, {min:0, max:255, stepAmount:0.0014});
	var blueSV = new fiveleft.SineValue( 0, {min:55, max:255, stepAmount:0.0055});
	var alphaSV = new fiveleft.SineValue( 0, {min:0.63, max:0.98, stepAmount:0.015});
	var tintSV = new fiveleft.SineValue( 0, {min:-0.15, max:0.95, stepAmount:randomBetween(0.001, 0.0025)} );
	var mixSV = new fiveleft.SineValue( 0, {min:0, max:1, stepAmount:randomBetween(0.005, 0.023)} );
	var saturateSV = new fiveleft.SineValue( 0, {min:0, max:100});
	var tintColor = new fiveleft.Color();
	var mixColor = new fiveleft.Color();
	var satColor = new fiveleft.Color();
*/
