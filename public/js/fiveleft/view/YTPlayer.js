
!function($){

	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	var _ref;

	function YTPlayer()
	{
		_ref = this;
		window.addEventListener( "youtube_init", $.proxy(this,'init') );
	}

	YTPlayer.prototype = {

		constructor : YTPlayer

		, playerID : "youtube-player"

		, player : null


		, init : function()
		{
			log( "YTPlayer::init" );

			this.player = null;
			this.$element = null;
			this.$container = null;
			this.$iframe = null;

			this.defaultData = {
				width : "100%"
				,height : "100%"
				,playerVars : {
					enablejsapi : 1
					,controls:0
					,loop:1
					,modestbranding:1
					,fs:0
					,playsinline:1
					,rel:0
					,showinfo:0
					,autohide:1
					,iv_load_policy:3
				}
				,events : {
					"onReady" : _ref.api_ready
					,"onStateChange" : _ref.api_stateChange
					,"onError" : _ref.api_error
				}
			};
			//log( "default data : ", this.defaultData );

			window.removeEventListener("youtube_init", this.init );
		}

		, create : function( container, videoID )
		{
			this.$container = $(container);
			this.$element = $(container).find( "#" + this.playerID );

			// If element doesn't exist yet, create it
			if( this.$element.length === 0 ) {
				this.$element = $("<div id=\"" + this.playerID + "\"></div>");
				$(container).append( this.$element );
			}

			if( this.player !== null && !$.contains(this.$element[0], this.$iframe) ) {
				// this.$iframe = this.player.getIframe();
				// this.$iframe = $(this.player.getIframe());
				// this.$iframe.appendTo( this.$element );
			}

			var ytData = $.extend( true, _ref.defaultData, {videoId:videoID});
			this.player = new YT.Player( this.playerID, ytData );

		}

		, destroy : function( player )
		{
			if( this.player === null ) return;
			this.player.destroy();
			this.player = null;
			this.$container.empty();
			this.$element = null;
			this.$iframe = null;
		}

		, api_error : function() 
		{
			// log( "YTPlayer.api_error", arguments );
		}

		, api_stateChange : function()
		{
			// log( "YTPlayer.api_stateChange", arguments);
		}
	
		, api_ready : function()
		{
			log( "YTPlayer.api_ready", arguments);
		}
	}

	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	// fiveleft.YTPlayer = new YTPlayer();

}($);