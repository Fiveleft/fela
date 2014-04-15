
!function($){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	var _cvs, _ctx;




	function fxyshape_loadManifest( src )
	{
		
	}

	function fxyshape_loadAssets( manifest )
	{
		loadQueue = new createjs.LoadQueue(true);
		loadQueue.addEventListener( "complete", handleLoadQueueEvent );
		loadQueue.addEventListener( "error", handleLoadQueueEvent );
		loadQueue.addEventListener( "fileload", handleLoadQueueEvent );

		loadQueue.loadManifest([
				{id:"bg-pat", src:"img/draw-assets/bg-grid-pat.png"}
				,{id:"sprite-patterns", src:"img/draw-assets/spritesheet-patterns.png"}
				,{id:"sprite-blobs", src:"img/draw-assets/spritesheet-blobs.png"}
				,{id:"sprite-splatters", src:"img/draw-assets/spritesheet-splatters.png"}
				// ,{id:"sprite-splatters", src:"img/draw-assets/spritesheet-splatters.jpg"}
			], false);
		loadQueue.load();
	}

	function fxyshape_build ( context )
	{

	}

