
!function(){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	/** 
	 * BleedingBrushPoint Consturctor
	 * <p>Configure, define shortcuts and initialize</p>
	 * <p>BleedingBrushPoint.js</p>
	 */
	var BleedingBrushPoint = function( bleedAmount, ease ) 
	{
		this.bleed = 2;
		this.bleedRatio = 0;
		this.easing = ease || Cubic.easeInOut;
	};


	// --------------------------------------------------------------------
	// Cached Functions
	// --------------------------------------------------------------------

	function brushPoint_create( a, t )
	{
		this.angle = a||this.angle;

		// Ensure the thickness leaves us with a line of 1px thickness
		this.thickness = spread( (t||this.thickness), -0.5, 0.5 );



		var v1ang = this.angle+(Math.PI/2)
			,v2ang = this.angle-(Math.PI/2)
			,radius = this.thickness * 0.5;


		this.v1.set( this.x + radius*Math.sin(v1ang), this.y + radius*Math.cos(v1ang) );
		this.v2.set( this.x + radius*Math.sin(v2ang), this.y + radius*Math.cos(v2ang) );
		return this;
	}

	function brushPoint_setAngle( a )
	{
		this.angle = a||this.angle;
		return this;
	}


	// --------------------------------------------------------------------
	// Class & Namespace Definition
	// --------------------------------------------------------------------

	BleedingBrushPoint.prototype = new fiveleft.BrushPoint();
	BleedingBrushPoint.constructor = BleedingBrushPoint;
	fiveleft.BleedingBrushPoint = BleedingBrushPoint;

}();


