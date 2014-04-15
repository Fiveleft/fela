if( typeof fiveleft == "undefined" ) var fiveleft={};



!function($){
	
	// Shortcuts
	var c = createjs;
	var _ref;
	
	// Angles
	var angle;
	var oppAngle;
	var oldAngle;
	var handleAngle;
	var tAngle = 0;
	
	// Calculations
	var d = 8; // Thickness
	var r; // Radians from Angle Degrees
	var ptDist = 0; // Distance between the draw points
	var fluctuation = -0.7;
	
	// Points
	var atp1, atp2; // Anchor Thickness points
	var oldAtp1, oldAtp2; // OLD Anchor Thickness points
	var htp1, htp2; // Thickness points at handles
	var anchor, oldAnchor; // The points we are drawing to
	var handle, oldHandle; // The points we use as curve handles
	var startAnchor, endAnchor;
	
	// Colors
	var fillColor = createjs.Graphics.getRGB( 255, 0, 127, 1 );
	var outlineColor = createjs.Graphics.getRGB( 0, 0, 0, 1 );
	var outlineColor2 = createjs.Graphics.getRGB( 0, 127, 0, 1 );
	var strokeColor = createjs.Graphics.getRGB( 0, 0, 0, 0.2 );
	var useColor = "#0000FF";
    
    // Display Object Shortcuts
    var _stage;
    var _canvas;
    var _drawShape;
	var rpt; // FPO RegPoint Shape
    var txt; // FPO Text Field
    
    // Resize Timeout helps ensure resizing is done before applying changes. Saves processing
    var _resizeTimeout = 0;
	
	// Do Action
	var render = false;
	


	/**
	 * Canvas Drawing Constructor
	 */	
	var CanvasDrawing = function( element ) {
		_ref = this;
		this.element = $(element);
		this.init();
	};


	CanvasDrawing.prototype = {

		constructor : CanvasDrawing

		, event : {

		}

		, init : function () {
			this.initProperties();
			this.initListeners();
			this.start();
		}

		, initProperties : function() {
			
		    // Elements
		    this.window = $(window);
		    this.canvas = this.element[0];
	        this.stage = new c.Stage( this.element.attr("id") );
			this.container = new c.Container();
	        this.drawShape = new c.Shape();
	        this.cacheShape = new c.Shape();
	        this.holderShape = new c.Shape();
	        this.regContainer = new c.Container();

	        // Display Stack
	        this.stage.addChild( this.container );
	        this.container.addChild( this.drawShape );
			this.container.addChild( this.regContainer );

			// Settings
	        this.stage.autoClear = true;
	        this.stage.onMouseDown = handleMouseDown;
	        this.stage.onMouseUp = handleMouseUp;
			c.Touch.enable(this.stage);

			// Properties
	        _stage = this.stage;
	        _canvas = this.canvas;
	        _drawShape = this.drawShape;
			this.isMouseDown = false;
			
			// Realizations
			this.tick = onTick;
	        this.stage.update();
	        //applyWindowResize();	        
		}

		, initListeners : function() {

			this.window.on("applyResize", applyWindowResize );


		}

		, start : function() {
	        c.Ticker.setFPS(20);
	        c.Ticker.addListener(this);
		}

		, stop : function() {
			c.Ticker.removeListener(this);
		}

		, tick : function() {
			log("override with custom tick function");
		}

	};

	
	// ------------------------------------------------------------------------------------------
	// Helper Methods
	// ------------------------------------------------------------------------------------------


	function fluctuateThickness() {
		fluctuation = (d < 2 || d > 30) ? -1*fluctuation : fluctuation;
		d += fluctuation;
	}



	function updateDrawShapeCache() {
		
		_drawShape.updateCache("source-overlay");
		_drawShape.graphics.clear();
		_stage.update();
	}		

	
	// ------------------------------------------------------------------------------------------
	// Private Methods
	// ------------------------------------------------------------------------------------------


	/**
	 * Handle Window Resize
	 * @param event Event
	 */
	function applyWindowResize() 
	{
		log("CanvasDrawing::applyWindowResize");
		// Clear the Resize Timeout
		_resizeTimeout = 0;

		_canvas.width = _ref.window.width();
	    _canvas.height = _ref.window.height();
	    	
    	_ref.container.x = _canvas.width/2;
    	_ref.container.y = _canvas.height/2;
	    

	    //_ref.cacheShape.cache(-_ref.container.x,-_ref.container.y,_canvas.width,_canvas.height);
	    _drawShape.cache(-_ref.container.x,-_ref.container.y,_canvas.width,_canvas.height);
	    // _stage.update();
	}


	/**
	 * Handle MouseUp
	 */
	function handleMouseDown() {

    	$("body").addClass("noSelect");
    	
       	_ref.isMouseDown = true;
      	render = true;
		startAnchor = new createjs.Point( _stage.mouseX-_ref.container.x, _stage.mouseY-_ref.container.y); 
		oldAnchor = startAnchor;
		oldHandle = startAnchor;
		
		_drawShape.graphics
			.beginFill( fillColor )
			.drawCircle( startAnchor.x, startAnchor.y, d )
			.endFill();
		
		// Update Drawing Cache
		updateDrawShapeCache();
    }
	
	
    function handleMouseUp() {

    	$("body").removeClass("noSelect");

        _ref.isMouseDown = false;
        render = false;
        
        if( startAnchor !== null ) {
        	return;
        }
        
		handle = new createjs.Point( _stage.mouseX-_ref.container.x, _stage.mouseY-_ref.container.y );
        anchor = new createjs.Point( oldHandle.x+handle.x>>1, oldHandle.y+handle.y>>1 );
        ptDist = TrigUtils.getDistance( anchor, handle );
        
		// Find angle of anchor
	    angle = (ptDist < 3) ? angle : TrigUtils.getAngle( anchor, handle );
		atp1 = TrigUtils.getPointAtAngledDistance( anchor, angle + 90, d );
		atp2 = TrigUtils.getPointAtAngledDistance( anchor, angle - 90, d );

    	// Find angle of handles we are curving through
    	angle = (ptDist < 3) ? angle : TrigUtils.getAngle( oldAnchor, anchor );
    	htp1 = TrigUtils.getPointAtAngledDistance( oldHandle, angle + 90, d );
    	htp2 = TrigUtils.getPointAtAngledDistance( oldHandle, angle - 90, d );
		
        _drawShape.graphics
        	.beginFill( fillColor )
        	.moveTo( atp1.x, atp1.y )
			.lineTo( atp2.x, atp2.y )
			.curveTo( htp2.x, htp2.y, oldAtp2.x, oldAtp2.y )
			.lineTo( oldAtp1.x, oldAtp1.y )
			.curveTo( htp1.x, htp1.y, atp1.x, atp1.y )
			.endFill()
        	.beginFill( fillColor )
			.arc( anchor.x, anchor.y, d, TrigUtils.degreesToRadians( 360-angle+30 ), TrigUtils.degreesToRadians( 180-angle-30 ), true )
			.endFill();
//	        	.arc()

		updateDrawShapeCache();
    }


    function onTick ( timeElapsed ) 
    {
	    if (render) 
	    {	
            handle = new createjs.Point( _stage.mouseX-_ref.container.x, _stage.mouseY-_ref.container.y );
        	anchor = new createjs.Point( oldHandle.x+handle.x>>1, oldHandle.y+handle.y>>1 );
	        angle = TrigUtils.getAngle( anchor, handle );
	        oldAngle = TrigUtils.getAngle( oldHandle, handle );

			// Make sure distance is greater than 2
			ptDist = TrigUtils.getDistance( anchor, handle );
			useColor= fillColor;
			/*
			var aThreshold = 90;
			if( oldAngle && Math.abs( oldAngle - angle ) > aThreshold ) {
				useColor = "#0000FF"
			}else{
				useColor = fillColor;
			}
			*/
        	
			if( ptDist > 4 ) {
				
				if( startAnchor != null ) {

        			anchor = new createjs.Point( oldHandle.x+handle.x>>1, oldHandle.y+handle.y>>1 );
	       			angle = TrigUtils.getAngle( anchor, handle );
	       			
	        		atp1 = TrigUtils.getPointAtAngledDistance( anchor, angle + 90, d );
		        	atp2 = TrigUtils.getPointAtAngledDistance( anchor, angle - 90, d );
		        	oldAtp1 = TrigUtils.getPointAtAngledDistance( oldHandle, angle + 90, d );
		        	oldAtp2 = TrigUtils.getPointAtAngledDistance( oldHandle, angle - 90, d );
		        	htp1 = TrigUtils.getPointAtAngledDistance( oldHandle, angle + 90, d );
		        	htp2 = TrigUtils.getPointAtAngledDistance( oldHandle, angle - 90, d );
	       			/*
		        	
		        	txt = new createjs.Text( (angle).toFixed(5), "10px Arial", "#333333");
					txt.x = oldAtp1.x; 
					txt.y = oldAtp1.y;
					_ref.regContainer.addChild(txt);
					*/
					
					_drawShape.graphics
						.clear()
		        		.setStrokeStyle( 1, "round", "round" )
		        		.beginStroke( useColor )
						.beginFill( useColor )
        				.arc( oldAnchor.x, oldAnchor.y, d, TrigUtils.degreesToRadians( 180-angle+30 ), TrigUtils.degreesToRadians( 360-angle-30 ), true )
	        	
        			startAnchor = null;
        			
        		}else{
        			
		        	fluctuateThickness();
		        	
		        	// Find angle of points we are drawing to
		        	atp1 = TrigUtils.getPointAtAngledDistance( anchor, angle + 90, d );
		        	atp2 = TrigUtils.getPointAtAngledDistance( anchor, angle - 90, d );
		        	
		        	// Find angle of handles we are curving through
		        	angle = TrigUtils.getAngle( oldAnchor, anchor );
		        	htp1 = TrigUtils.getPointAtAngledDistance( oldHandle, angle + 90, d );
		        	htp2 = TrigUtils.getPointAtAngledDistance( oldHandle, angle - 90, d );
					
					_drawShape.graphics
		        		.setStrokeStyle( 1, "round", "round" )
		        		.beginStroke( useColor )
						.beginFill( useColor )
						.moveTo( atp1.x, atp1.y )
						.lineTo( atp2.x, atp2.y )
						.curveTo( htp2.x, htp2.y, oldAtp2.x, oldAtp2.y )
						.lineTo( oldAtp1.x, oldAtp1.y )
						.curveTo( htp1.x, htp1.y, atp1.x, atp1.y )
						.endFill();
						
					/*	
	        		rpt = new window.RegPoint( oldAtp1, "#0000FF", 1 );
		        	_ref.regContainer.addChild( rpt );
	        		rpt = new window.RegPoint( oldAtp2, "#00FF00", 1 );
		        	_ref.regContainer.addChild( rpt );
		        	*/
				
		            oldAtp1 = atp1;
		            oldAtp2 = atp2;
		            oldHtp1 = htp1;
		            oldHtp2 = htp2;
        		}
        		
        		updateDrawShapeCache();
			} 

            
	        oldHandle = handle;
	        oldAnchor = anchor;
	        oldAngle = angle;
            render = _ref.isMouseDown;
        }
    }

	    	    
	fiveleft.canvasDrawing = CanvasDrawing;	
	    
		
}($);
	
