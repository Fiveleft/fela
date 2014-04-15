if( typeof fiveleft == "undefined" ) fiveleft = {};

!function(){

	/* Classname Shortcut */
	var _cn = "Shape";
	var _uid = -1;


	/** 
	 * Shape Consturctor
	 * <p>Configure, define shortcuts and initialize</p>
	 * <p>Shape.js</p>
	 * @param element {DOMElement} - base DOMElement for component
	 * @param options {Object} - configuration override
	 */
	function Shape( ctx ) 
	{	
		this.id = _uid++;
		this.context = ctx || null;
		this.position = new fiveleft.Vector();

	}


	Shape.prototype = {

		constructor : Shape

		,id : null
		
		,context : null

		,position : null

		,cacheCanvas : null

		,useCache : false

		,cache : function( ctx )
		{
			if( this.cacheCanvas==null ) {
				this.cacheCanvas = document.createElement( "canvas" );
				this.cacheCanvas.id = "canvas_" + this.id;
			}
		}

		,destroy : function()
		{
			
		}

		,draw : function( ctx )
		{
			throw "Shape.draw() method is intended to be overridden and never calle directly";
		} 
	};

	fiveleft.Shape = Shape;


}();