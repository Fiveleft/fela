if( typeof fiveleft == "undefined" ) fiveleft = {};

!function($){
	

	function ProjectData( data ) {

		$.extend( true, this, data||{} );

		this.title = this.title.replace(/'/, "’");
		this.subtitle = (this.info.subtitle) ? this.info.subtitle.replace(/'/, "’") : false;

		this._hasDiscipline = [];
		this._hasTechnology = [];

		// Content is either the cleaned content (removed gallery) or the original
		// this.content = (this.clean_content) ? this.clean_content : this.content;
		// delete this.clean_content;

		if( this.info && this.info.launchdate ){
			var d_arr = this.info.launchdate.split("-");
			var date = new Date( d_arr[0], d_arr[1]-1, d_arr[2] );
			this.info.launchedOn = date.toLocaleDateString();	
			this.info.launchTime = date.getTime();
		}else{
			this.info.launchTime = 0;
		}


		// Attachment Map
		if( this.attachments.length ) 
		{
			var _attachmentMap = [], a;
			for( var i=this.attachments.length-1; i!==-1; i-- ) {
				a = this.attachments[i];
				_attachmentMap[ a.id ] = a;
			}
			this.getAttachment = function( id ) {
				return typeof _attachmentMap[id] !== "undefined" ? _attachmentMap[id] : null;
			}
		}

		// Create Gallery
		if( typeof this.gallery !== "undefined" ) 
		{
			var galleryMap = []
				,galleryList = this.gallery.ids.split(",")
				,galleryItem;

			for( var i=0, len=galleryList.length; i!==len; i++ ) {
				galleryItem = this.getAttachment( galleryList[i] );
				galleryMap.push( galleryItem );
			}
			this._gallery = this.gallery;
			this.gallery = galleryMap;
		}

		// Create Video
		if( typeof this.video !== "undefined" )
		{
			var _poster = this.video.poster;
			if( _poster ) {
				this.video._poster = _poster;
				this.video.poster = this.getAttachment( _poster );
			}
		} 
	}

	ProjectData.prototype = {

		constructor : ProjectData

		, _hasDiscipline : []

		, _hasTechnology : []

		, hasDiscipline : function ( slug ) {
			if( typeof this._hasDiscipline[slug] == "undefined" ) {
				var hasMatch = false;
				for( var len=this.discipline.length, i=len-1; i>=0 && !hasMatch; i-- ) {
					hasMatch = this.discipline[i].slug == slug;
				}
				this._hasDiscipline[slug] = hasMatch;
			}
			return this._hasDiscipline[slug];
		}

		, hasTechnology : function ( slug ) {
			if( typeof this._hasTechnology[slug] == "undefined" ) {
				var hasMatch = false;
				for( var len=this.technology.length, i=len-1; i>=0 && !hasMatch; i-- ) {
					hasMatch = this.technology[i].slug == slug;
				}
				this._hasTechnology[slug] = hasMatch;
			}
			return this._hasTechnology[slug];
		}

	}
	
	
	// ------------------------------------------------------------------------------------------
	// Class Namespace
	// ------------------------------------------------------------------------------------------
	

	fiveleft.ProjectData = ProjectData;


}($);