
!function( global )
{
	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;


	// Class Inheritance
	Function.prototype.extend = function ( parent )
	{
		var prop;
		if( this===parent || typeof this === parent ) {
			log( "Error, " + this + "cannot extend itself" );
			return;
		}
		for( prop in parent.prototype ) {
			// log( prop + "[" + typeof parent.prototype[prop] + "] : " + parent.prototype[prop])
			if( typeof parent.prototype[prop] == "function" && !this.prototype[prop] ){
				this.prototype[prop] = parent.prototype[prop];
			}
		}
		this.prototype["_super"] = parent;
	};



	// usage: log('inside coolFunc',this,arguments);
	// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
	global.log = function(){
		log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);typeof console.log=="object"?log.apply.call(console.log,console,a):console.log.apply(console,a)}};(function(a){function b(){}for(var c="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),d;d=c.pop();)a[d]=a[d]||b})(function(){try{console.log();return window.console}catch(a){return window.console={}}}());(function(){var a=jQuery.event.special,b="D"+ +(new Date),c="D"+(+(new Date)+1);a.scrollstart={setup:function(){var c,d=function(b){var d=this,e=arguments;if(c)clearTimeout(c);else{b.type="scrollstart";jQuery.event.handle.apply(d,e)}c=setTimeout(function(){c=null},a.scrollstop.latency)};jQuery(this).bind("scroll",d).data(b,d)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(b))}};a.scrollstop={latency:300,setup:function(){var b,d=function(c){var d=this,e=arguments;b&&clearTimeout(b);b=setTimeout(function(){b=null;c.type="scrollstop";jQuery.event.handle.apply(d,e)},a.scrollstop.latency)};jQuery(this).bind("scroll",d).data(c,d)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(c))}}})();String.prototype.trunc=function(a,b){var c=this.length>a,d=c?this.substr(0,a-1):this;d=b&&c?d.substr(0,d.lastIndexOf(" ")):d;return c?d+"...":d;
	};

	global.shuffle = function() {
		return 0.5 - Math.random();
	};

	global.toRad = function( degrees ) {
		return degrees*(Math.PI/180);
	};

	global.toDeg = function( radians ) {
		return radians*(180/Math.PI);
	};

	global.randomBetween = function( min, max ) {
		return min + (Math.random() * (max-min));
	};

	global.randomAround = function( value ) {
		return (value * -0.5) + (Math.random()*value);
	};

	global.eitherOr = function( a, b ) {
		return Math.random() > 0.5 ? a : b;
	};

	global.randomPosNeg = function() {
		return -1 + (2*Math.random());
	};

	global.clamp = function( value, min, max ) {
		return (value < min) ? min : (value > max) ? max : value; 
	};

	global.spread = function( value, min, max ) {
		return (value > min && value < max) ? ( value>=((max-min)*0.5) ? max : min ) : value;
	};

	/**
	 * More Efficient Rounding function using bitwise operator '<< 0'
	 * @see http://jsperf.com/math-round-vs-hack/3
	 * @param  {Number} val
	 * @return {Number} rounded number
	 */
	global.round = function( val ) {
		return (0.5 + val) << 0;
	};

	global.isBetween = function (value, min, max) {
		return ((value > min) && (value < max)); 
	};

	global.inRange = function (value, min, max) {
		return ((value >= min) && (value <= max)); 
	};

	global.ratioBetween = function (value, min, max) {
		return (value-min)/(max-min);
	};

	global.ratioOf = function( value, min, max ) {
		return min + (max-min)*value;
	};

	global.interpolate = function( a, b, ratio ) {
		return a + (b-a)*ratio;
	};

	global.isObject = function (value) {
		return typeof value === 'object' && value !== null; 
	};

	global.isNumber = function (value)  {
		return typeof value === 'number'; 
	};

	global.isString = function (value)  {
		return typeof value === 'string'; 
	};

	global.isFunction = function (value)  {
		return typeof value === 'function'; 
	};

	global.isArray = function (value)  {
		return Object.prototype.toString.call(value) === '[object Array]'; 
	};

	global.isNull = function (value)  {
		return value === null; 
	};

	global.isUndefined = function (value)  {
		return typeof value === 'undefined'; 
	};

	global.firstToLast = function( array ) {
		var item = array.shift();
		array.push(item);
		return item;
	};

	global.lastToFirst = function( array ) {
		var item = array.pop();
		array.unshift( item );
		return item;
	};




	// EASING //
	// no easing, no acceleration
	global.linear = function(t) { return t; };
	// accelerating from zero velocity
	global.easeInQuad = function(t) { return t*t; };
	// decelerating to zero velocity
	global.easeOutQuad = function(t) { return t*(2-t); };
	// acceleration until halfway, then deceleration
	global.easeInOutQuad = function(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; };
	// accelerating from zero velocity 
	global.easeInCubic = function(t) { return t*t*t; };
	// decelerating to zero velocity 
	global.easeOutCubic = function(t) { return (--t)*t*t+1; };
	// acceleration until halfway, then deceleration 
	global.easeInOutCubic = function(t) { return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; };
	// accelerating from zero velocity 
	global.easeInQuart = function(t) { return t*t*t*t; };
	// decelerating to zero velocity 
	global.easeOutQuart = function(t) { return 1-(--t)*t*t*t; };
	// acceleration until halfway, then deceleration
	global.easeInOutQuart = function(t) { return t<0.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; };
	// accelerating from zero velocity
	global.easeInQuint = function(t) { return t*t*t*t*t; };
	// decelerating to zero velocity
	global.easeOutQuint = function(t) { return 1+(--t)*t*t*t*t; };
	// acceleration until halfway, then deceleration 
	global.easeInOutQuint = function(t) { return t<0.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; };



	// COLOR HELPERS //
	global.getRGB = function(r, g, b, alpha) {
		if (r !== null && b === null) {
			alpha = g;
			b = r&0xFF;
			g = r>>8&0xFF;
			r = r>>16&0xFF;
		}
		return (alpha===null) ? "rgb("+r+","+g+","+b+")" : "rgba("+r+","+g+","+b+","+alpha+")";
	};

	global.getHSL = function(h, s, l, alpha) {
		return alpha===null ? "hsl("+(h%360)+","+s+"%,"+l+"%)" : "hsla("+(h%360)+","+s+"%,"+l+"%,"+alpha+")";
	};


}(window);



// static public methods:
 
 
	/**
	 * Returns a CSS compatible color string based on the specified RGB numeric color values in the format
	 * "rgba(255,255,255,1.0)", or if alpha is null then in the format "rgb(255,255,255)". For example,
	 *
	 *      createjs.Graphics.getRGB(50, 100, 150, 0.5);
	 *      // Returns "rgba(50,100,150,0.5)"
	 *
	 * It also supports passing a single hex color value as the first param, and an optional alpha value as the second
	 * param. For example,
	 *
	 *      createjs.Graphics.getRGB(0xFF00FF, 0.2);
	 *      // Returns "rgba(255,0,255,0.2)"
	 *
	 * @method getRGB
	 * @static
	 * @param {Number} r The red component for the color, between 0 and 0xFF (255).
	 * @param {Number} g The green component for the color, between 0 and 0xFF (255).
	 * @param {Number} b The blue component for the color, between 0 and 0xFF (255).
	 * @param {Number} [alpha] The alpha component for the color where 0 is fully transparent and 1 is fully opaque.
	 * @return {String} A CSS compatible color string based on the specified RGB numeric color values in the format
	 * "rgba(255,255,255,1.0)", or if alpha is null then in the format "rgb(255,255,255)".
	 **/
	// Graphics.getRGB = function(r, g, b, alpha) {
	// 	if (r != null && b == null) {
	// 		alpha = g;
	// 		b = r&0xFF;
	// 		g = r>>8&0xFF;
	// 		r = r>>16&0xFF;
	// 	}
	// 	if (alpha == null) {
	// 		return "rgb("+r+","+g+","+b+")";
	// 	} else {
	// 		return "rgba("+r+","+g+","+b+","+alpha+")";
	// 	}
	// };
 
	/**
	 * Returns a CSS compatible color string based on the specified HSL numeric color values in the format "hsla(360,100,100,1.0)",
	 * or if alpha is null then in the format "hsl(360,100,100)".
	 *
	 *      createjs.Graphics.getHSL(150, 100, 70);
	 *      // Returns "hsl(150,100,70)"
	 *
	 * @method getHSL
	 * @static
	 * @param {Number} hue The hue component for the color, between 0 and 360.
	 * @param {Number} saturation The saturation component for the color, between 0 and 100.
	 * @param {Number} lightness The lightness component for the color, between 0 and 100.
	 * @param {Number} [alpha] The alpha component for the color where 0 is fully transparent and 1 is fully opaque.
	 * @return {String} A CSS compatible color string based on the specified HSL numeric color values in the format
	 * "hsla(360,100,100,1.0)", or if alpha is null then in the format "hsl(360,100,100)".
	 **/
	// Graphics.getHSL = function(hue, saturation, lightness, alpha) {
	// 	if (alpha == null) {
	// 		return "hsl("+(hue%360)+","+saturation+"%,"+lightness+"%)";
	// 	} else {
	// 		return "hsla("+(hue%360)+","+saturation+"%,"+lightness+"%,"+alpha+")";
	// 	}
	// };

