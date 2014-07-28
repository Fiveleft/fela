
(function(){
  
  var C = fiveleft.Color;


  function MDFYR()
  {
    // Initial definition;
    this._init();

    // Methods
    this.init = init;
    this.onUpdate = update;
    this.mixRatio = Cubic.easeInOut.getRatio;
    this.destroy = destroy;

    // Properties
    this.canvas = document.createElement("canvas");
    this.cacheCanvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.cacheContext = this.cacheCanvas.getContext("2d");

    this.seconds = 0;
    this.size = round( randomBetween( 100, 200 ) );
    this.cStart = new C( 0, randomBetween(100,150), randomBetween(200,255) ).desaturate(0);
    this.cEnd = new C( randomBetween(100,150), randomBetween(100,150), randomBetween(200,255) ).desaturate(80);
    this.color = new C();
    this.color.mixColors( this.cStart, this.cEnd, this.progress );

    this.canvas.width = this.cacheCanvas.width = this.size;
    this.canvas.height = this.cacheCanvas.height = this.size;

    // Initialize
    this.init();
  }

  function init() 
  {
    var cctx = this.cacheContext;
    cctx.beginPath();
    cctx.rect( 0, 0, this.size, this.size );
    cctx.fillStyle = this.cStart.getRGB();
    cctx.fill();
  };

  function update() 
  {
    var s = this.elapsed / 1000;
    if( this.seconds !== s ) {
      this.seconds = s;
      //log( "MDYFR.update()", this.seconds );
    }

    this.color.mixColors( this.cStart, this.cEnd, this.progress );

    this.context.globalCompositeOperation = "source-over";
    this.context.clearRect(0,0,this.size,this.size);
    this.context.drawImage( this.cacheCanvas, 0, 0 );

    this.context.globalCompositeOperation = "destination-in";
    this.context.rect(0,0,this.size,this.size);
    this.context.fillStyle = this.color.getRGBA();
  };

  function destroy()
  {

  };


  MDFYR.prototype = new fiveleft.CompositionModifier();
  MDFYR.constructor = MDFYR;
  fiveleft.MDFYR = MDFYR;

})();