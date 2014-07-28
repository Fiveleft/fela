
(function(){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft

	var uid = 0;



	/** 
	 * Composition Modifier
	 */
	var CompositionModifier = function() 
	{
		this.type = "untyped modifier";
		this.active = false;
		this.created = 0;
		this.incubation = 0;
		this.elapsed = 0;
		this.progress = 0;
		this.used = 0;
		this.start = 0;
		this.end = 0;
		this.duration = 0;
		this.pausable = false;
	};


	CompositionModifier.prototype = {

		constructor : CompositionModifier,
		active : false,
		created : 0,
		elapsed : 0,
		incubation : 0,
		progress : 0,
		start : 0,
		end : 0,
		used : 0,
		duration : 0,
		pausable : false,
		onStart : function() {},
		onEnd : function() {},
		onPause : function() {},
		onResume : function() {},
		onRestore : function() {},
		onUpdate : function() {},		
		destroy : function() {},

		_init : function() {
			this._uid = "_" + uid++;
			this.created = Date.now();
		},
		_restore : function(t) {
			this.start = this.incubation + t||0;
			this.end = this.start + this.duration;
			this.progress = 0;
			this.onRestore();
		},
		_pause : function() {
			this.onPause();
		},
		_resume : function(){ 
			this.onResume();
		},
		_start : function() {
			this.active = true;
			this.duration =  this.end - this.start;
			this.progress = 0;
			this.used ++;
			if( this.used == 1 ) {
				this.incubation = Date.now() - this.created;
			}
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
			this.elapsed = Math.round( this.duration * this.progress );
			this.onUpdate();
		},
		_destroy : function() {
			this.destroy();
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