
!function($){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	/** 
	 * SpriteSheet
	 * @param {Image} img - loaded Image Element
	 * @param {int} cols Sprite Sheet columns
	 * @param {int} rows Sprite Sheet rows
	 */
	function SpriteSheet( img, cols, rows ) 
	{	
		this.image = img;
		this.cols = cols;
		this.rows = rows;
		this.canvas = document.createElement( "canvas" );
		this.context = this.canvas.getContext("2d");
		this.cells = this.cols * this.rows;
		
		this.sprite = {
				width : ((img.width / cols) + 0.5) << 0
				,height : ((img.height / rows) + 0.5) << 0
			};

		this.drawSprite = spritesheet_drawSprite;
	}


	/**
	 * DrawSprite takes coordinates or sprite position (1-based)
	 *  and returns a sized canvas element with the desired sprite position
	 *  rendered into it
	 * @param  {int} col   1-based column "x-coordinate" or sprite position (reading left-right, top-down)
	 * @param  {int} row   1-based row "y-coordinate" or sprite position (reading left-right, top-down)
	 * @param  {Number} scale [description]
	 * @return {DOMElement} canvas
	 */
	var spritesheet_drawSprite = function( col, row, scale )
	{
		var s = scale||1
			,usePos = (row === null || typeof row === "undefined") 
			,r = usePos ? Math.ceil(col/this.cols): row||1
			,c = usePos ? ((col%this.cols===0) ? this.cols : col%this.cols) : col||1
			,w = this.sprite.width
			,h = this.sprite.height
			,sx = (c-1) * w
			,sy = (r-1) * h;

		// log( "cols:" + this.cols + ", rows:" + this.rows + "  =  " + col + ":(" + c + ", " + r + ")" );

		// Reset the canvas
		this.canvas.width = round( w*s );
		this.canvas.height = round( h*s );
		this.context.scale( s, s );
		this.context.drawImage( this.image, sx, sy, w, h, 0, 0, w, h );
		
		return this.canvas;
	};



	fiveleft.SpriteSheet = SpriteSheet;


}();