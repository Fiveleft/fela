if( typeof fiveleft == "undefined" ) fiveleft = {};

!function(){

	/* Classname Shortcut */
	var _cn = "SineValue";


	/** 
	 * SineValue Consturctor
	 * <p>Configure, define shortcuts and initialize</p>
	 * <p>SineValue.js</p>
	 */
	function SineValue( value, options ) 
	{	
		this.options = options || {};

		// Properties
		this.startValue = value || 0;

		// Functions
		this.update = sineValue_update;
		this.reset = sineValue_reset;

		// Set all properties
		this.reset();
	}


	function sineValue_reset()
	{
		this.min = this.options.min || -this.startValue;
		this.max = this.options.max || this.startValue;
		this.value = this.min;
		this.variance = this.max-this.min;
		this.stepAmount = this.options.stepAmount || 0.025;
		this.stepValue = (Math.PI/2) - this.stepAmount;
		return this.value;
	}


	function sineValue_update() 
	{
		this.stepValue += this.stepAmount;
		this.sin = Math.sin( this.stepValue );
		this.cos = Math.cos( this.stepValue );
		this.value = ratioOf( ((this.sin+1)*0.5), this.min, this.max );
		return this.value;
	}



	// SineValue.prototype = {

	// 	constructor : Number
	// 	,stepValue : 1
	// 	,stepAmount : 0.025 // 40 ticks to complete one cycle.
	// 	,min : -1
	// 	,max : 1
	// 	,sin : 0
	// 	,cos : 0
	// 	,value : 0
	// 	,variance : 0

	// 	,step : function() {
	// 		this.stepValue += this.stepAmount;
	// 		this.sin = Math.sin( this.stepValue );
	// 		this.cos = Math.cos( this.stepValue );
	// 		this.variance = (this.max-this.min) * this.sin;
	// 		this.value = this.min + ((this.sin+1)*0.5) * (this.max-this.min);
	// 		return this.value;
	// 	}

	// 	,reset : function() {
	// 		this.stepValue = -this.stepAmount;
	// 		return this.step();
	// 	}

	// };

	fiveleft.SineValue = SineValue;


}();