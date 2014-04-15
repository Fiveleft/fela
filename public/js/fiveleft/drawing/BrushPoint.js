
!function(){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	/** 
	 * BrushPoint Consturctor
	 * <p>Configure, define shortcuts and initialize</p>
	 * <p>BrushPoint.js</p>
	 */
	var BrushPoint = function( ) 
	{
		this.angle = 0;
		this.thickness = 20;
		this.radius = 1;
		this.bleedAmount = 1;
		this.bleedValue = 1;
		this.handle = new fiveleft.Vector();
		this.h1 = new fiveleft.Vector();
		this.h2 = new fiveleft.Vector();
		this.v1 = new fiveleft.Vector();
		this.v2 = new fiveleft.Vector();

		this.bleed = brushPoint_bleed;
		this.update = brushPoint_update;
		this.setAngle = brushPoint_setAngle;
		// this.setBleed = brushPoint_setBleed;
		this.setHandle = brushPoint_setHandle;
		this.setThickness = brushPoint_setThickness;
	};

	BrushPoint.bleedMax = 20;
	BrushPoint.bleedEase = Sine.easeInOut;


	// --------------------------------------------------------------------
	// Cached Functions
	// --------------------------------------------------------------------

	function brushPoint_update( angle, thickness ) 
	{
		this.angle = angle||this.angle;
		this.thickness = spread( (thickness||this.thickness), -0.5, 0.5 );

		var v1ang = this.angle+(Math.PI/2)
			,v2ang = this.angle-(Math.PI/2)
			,radius = (this.thickness*this.bleedValue) * 0.5;

		this.v1.set( this.x + radius*Math.sin(v1ang), this.y + radius*Math.cos(v1ang) );
		this.v2.set( this.x + radius*Math.sin(v2ang), this.y + radius*Math.cos(v2ang) );
		this.h1.copy( this.v1 );
		this.h2.copy( this.v2 );
		return this;
	}

	function brushPoint_bleed()
	{
		this.bleedAmount = this.bleedAmount==BrushPoint.bleedMax ? BrushPoint.bleedMax : this.bleedAmount+1;
		var bleedRatio = BrushPoint.bleedEase.getRatio( this.bleedAmount/BrushPoint.bleedMax );
		this.bleedValue = ratioOf( bleedRatio, 1, BrushPoint.bleedMax );
		return this;
	}

	function brushPoint_setAngle( a )
	{
		this.angle = a||this.angle;
		return this;
	}

	function brushPoint_setThickness( amount ) 
	{
		// Ensure the thickness leaves us with a line of 1px thickness
		this.thickness = spread( (amount||this.thickness), -0.5, 0.5 );
		return this;
	}

	function brushPoint_setHandle( pointOrFalse )
	{
		if( !pointOrFalse ) {
			this.useHandle = false;
			return;
		}

		this.handle = false;

	}


	// --------------------------------------------------------------------
	// Class & Namespace Definition
	// --------------------------------------------------------------------

	BrushPoint.prototype = new fiveleft.Vector();
	BrushPoint.constructor = BrushPoint;
	fiveleft.BrushPoint = BrushPoint;

}();


