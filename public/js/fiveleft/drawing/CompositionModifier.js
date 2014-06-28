
(function(){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft

	var uid = -1;



	/** 
	 * Composition Modifier
	 */
	var CompositionModifier = function() 
	{
	};


	CompositionModifier.prototype = {

		constructor : CompositionModifier, 

		init : function(){
			this._uid = "_" + uid++;
			this.active = false;
			this.progress = 0;
			this.start = 0;
			this.end = 0;
			this.pausable = false;
		}
		onStart : function() {},
		onEnd : function() {},
		onPause : function() {},
		onResume : function() {},
		onUpdate : function() {},
		pause : function() {
			// do anything?
			this.onPause();
		},
		resume : function(){ 
			// do anything?
			this.onResume();
		},
		_start : function() {
			this.active = true;
			this.progress = 0;
			this.onStart();
			this.onUpdate();
		},
		_end : function() {
			this.progress = 1;
			this.active = false;
			this.onUpdate();
			this.onEnd();
		},
		_update : function( t ) {
			this.progress = ratioBetween( t, this.start, this.end );
			this.onUpdate();
		},
	};

	/* 

	CompositionModifier

	What does this do:
	- Apply a modifier to the composition to affect its appearance

	What should it accomplish:
	- it should: Add styles, shapes, colors to the composition over a period of time
		and: preserve it self when complete so it can be reused
	- it should: have a starting point in (ms) to know when to begin
	- it should: have an ending point to know when to end and remove itself from the queue
	- it should: have an updating method to allow for its modification to update and render
	- it should: be extendable so that more modifications can be added while preserving core function
	*/



	// --------------------------------------------------------------------
	// Class & Namespace Definition
	// --------------------------------------------------------------------

	fiveleft.CompositionModifier = CompositionModifier;

})();