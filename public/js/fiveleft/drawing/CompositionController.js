/**

	CompositionController

	What does this do:
	- Monitor controls of composition, what color, shape, brush, speed, etc. the drawingAPI should be using. 

	What should it accomplish:
	- Begin running at application startup.
	- Run for duration of applicaton runtime
	- Monitor environment device settings to optimize experience
	- Listen to input from user/device to change output
	- Prevent duplication of user experience: make each composition unique!

	For Running Controls:
	- it should: begin running at application start
		then: monitor the loading of assets 
		and: provide an experience while loading assets.
	- it should: manage resources by preventing composition animations from running while the application is performing processor-intensive operations

	For Input from User/Device
	- it should: receive input from Mouse, Touch, and Motion 
	- it should: smoothly apply device input onto the composition

	For Color Management:
	- it should: manage a color palette
		and: use colors responsibly, not too many or contrasting.
		and POSSIBLY: allow for user/api input of other color palettes
		and POSSIBLY: choose color palettes based on location/environment setings

	For Composition Balance:
	- it should: understand composition balance by avoiding chaos/random drawing
	- it should: understand the weight of items added to each composition grid unit, and apply new art accordingly
	- it should: KNOW WHEN TO STOP
	- it should: let user know when its finished, and when to wait.
		by: deciding ahead of time how many styles and iterations it would like to perform before finishing.

	For Brushes and Shapes:
	- it should: select a limited amount of brush styles and shapes and apply them responsibly
		and: iterate through the set of selected styles once before randomly shuffling the set and iterating again.

	For Asset Loading:
	- it should: load in assets at startup and prevent delay during heavy load time.

	For Handling Random Selection:
	- it should run one selected style at a time, until a specified timer runs out.
		OR: it should transition between one style and another during a specified time;
**/



(function(){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	// Dependencies
	// var dependencies = [ "Vector", "MotionVector", "Rectangle", "RegPoint" ];
	// for( var d=dependencies.length-1; d!==-1; d-- ) {
	// 	if( typeof fiveleft[dependencies[d]] === "undefined" ) {
	// 		throw new Error( "fiveleft.CompositionLayout uses " + dependencies[d].toString() + " but could not find it" );
	// 	}
	// }


	// Variables
	var _ref,
		modifiers = [],
		modMap = []
		modCount = 0
		active = [],
		time = 0
		timer = 0
		;


	/** 
	 * Composition Controller
	 */
	var CompositionController = function() 
	{
		_ref = this;
	};


	function addModifier( m ) 
	{
		modCount = modifiers.push( m );
		modMap[ m.start ] = undefined ? [] : modMap[ m.start ];
		modMap[ m.end ] = undefined ? [] : modMap[ m.end ];
		modMap[ m.start ].push(m);
		modMap[ m.end ].push(m);

		updateStats();
	}

	function removeModifier( mTarget ) 
	{	
		var removed = false,
				m;
		for( i=modifiers.length-1; i!==-1 && !removed; i-- ) {
			m = modifiers[i];
			removed = m.uid === mTarget.uid ? true : removed;
			if( removed ) {
				modifiers.splice(i,0);
				modCount = modifiers.length;
			}
		}

		if( removed ) {
			updateStats();
		}
	}

	function update( t ) {
		if( modCount ) updateModifiers(t);
	}


	/**
	 * Update Modifier List
	 * @param  {Number} t time - in milliseconds
	 * @return {[type]}   [description]
	 */
	function updateModifiers( t ) 
	{
		var i = modCount-1,
				m;

		for( i; i!==-1; i-- ) {
			m = modifiers[i];

			switch( true ) {
				case !m.active && m.start <= t :
					m._start();
					break;
				case m.active && m.start <= t && m.end > t :
					m._update();
					break;
				case m.active && m.end <= t :
					m._end();
					removeModifier(m);
					break;
			}
		}
	}


	function updateStats() 
	{
		var types = []

	}





	// --------------------------------------------------------------------
	// Class & Namespace Definition
	// --------------------------------------------------------------------

	fiveleft.CompositionController = CompositionController;

})();