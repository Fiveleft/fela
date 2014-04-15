!function($){
	
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	var _cn = "ApplicationData"
		, _ref
		, _evt
		, _scrollTarget = null
		, _taxonomies = {}
		, _projectList = []
		, _agencies = []
		, _clients = []
		, _technologyList = []
		, _disciplineList = []
		, _projectMap = {}
		, _technologyMap = {}
		, _disciplineMap = {}
		, _localTime = new Date()
		, _now
		, _welcomeComplete = false
		, _recentlyVisited = false
		, _layout = {}

		, _mediaQueries = {
			mobile : "(max-width : 480px)"
			,tablet : "(min-width : 481px) and (max-width : 767px)"
			,desktop : "(min-width : 768px) and (max-width : 1170px)"
			,large : "(min-width : 1170px)"
		}
		, _mediaQueryMap = [];


	// ------------------------------------------------------------------------------------------
	// Class Definition
	// ------------------------------------------------------------------------------------------
	var ApplicationData = function() 
	{
		_ref = this;
		_evt = fiveleft.Event;
		this.init();
	};

	
	ApplicationData.prototype = {
		
		constructor : ApplicationData


		, init : function() {
			
			this.initProperties();
			this.initCookies();
			this.initListeners();
		} 
		
		, initProperties : function() 
		{
			// Elements
			this.doc = $("html");
			this.body = $("body");
			this.$window = $(window);

			// log( "aspect ratio: " + this.$window.width() + ", " + this.$window.height() );

			// Properties
			this.isIE = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
			this.isIE8 = this.doc.hasClass("ie8");
			this.isTouch = this.doc.hasClass("touch");
			this.isiOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent); //this.body.hasClass("iOS");
			this.isMobile = /(android)|(webOS)/g.test(navigator.userAgent) || this.isiOS;
			this.baseURL = fiveleft._baseURL || (location.protocol + '//' + location.host + location.pathname);
			this.environment = fiveleft._environment;
			this.mediaDir = fiveleft._mediaDir;
			this.pageTitle = this.doc.find("title").text();
			this.mediaQueries = [];
			this.scrollLayout = true;
			this.mobileLayout = false;
			this.portraitLayout = false;
			this.dataLoaded = false;

			if( this.isiOS ) this.doc.addClass("iOS");

			// Define Queries
			if( window.matchMedia ) {

				var q, mq, targetMQ=null;

				for( q in _mediaQueries ) {
					mq = window.matchMedia( _mediaQueries[q] );
					mq.name = q;
					mq.addListener( handleMediaQueryUpdate );
					targetMQ = mq.matches ? mq : targetMQ;
					_mediaQueryMap[mq.name] = mq;
					this.mediaQueries.push(mq);
				}
				
				this.targetMediaQuery = targetMQ;
				this.scrollLayout = !this.isiOS && (targetMQ.name == "desktop" || targetMQ.name == "large");
				this.mobileLayout = targetMQ.name == "mobile" || targetMQ.name == "tablet";
			}
		}

		, deleteCookies : function() 
		{
			deleteCookie( "visit" );
			deleteCookie( "intro_complete" );
		}
		
		, initCookies : function() 
		{
			var now = Date.now()
				,oneMonth = (30 * 24 * 3600 * 1000)
				,c_visit = getCookie("visit")
				,c_introCompleted = getCookie("intro_complete")
				,lastVisit = (typeof c_visit !== "undefined") ? c_visit : 0
				,introCompleted = (typeof c_introCompleted !== "undefined") ? c_introCompleted==="true" : false
				,recentVisit = now - lastVisit < oneMonth;

			log( "ApplicationData::initCookies" );
			log( "\tnow:", now, "\n\tlastVisit:", lastVisit, "\n\trecentVisit:", recentVisit, "\n\tintroCompleted:", introCompleted );

			this.introCompleted = introCompleted;
			this.recentVisit = recentVisit;
			setCookie( "visit", now, 30 );
		}

		, initListeners : function() 
		{
			this.$window
				.on( "orientationchange", handleOrientationChange )
				.on( _evt.IntroSequenceComplete, handleIntroComplete );
			// log( _cn + "::initListeners" );
		}

		
		/**
		 * Get Base URL string defined in <body> attribute "data-base-url" by PHP
		 * @return {String}
		 */
		, getBaseURL : function() {
			return this.baseURL;
		}
		

		, getMediaQuery : function( name ) {
			return (typeof _mediaQueryMap[name] !== "undefined" ) ? _mediaQueryMap[name] : {name:"undefined", matches:false};
		}
		
		/**
		 * Get Device Type specified in <body> attribute "data-device-type" by PHP
		 * @return {String}
		 */
		, getDevice : function() {
			return this.deviceType;
		}
		
		
		/**
		 * Get Now - the time the Application started
		 * @return {Date}
		 */
		, getNow : function() {
			_now = new Date();
			_now.setMinutes( this.getLocalTime().getTimezoneOffset() );
			return _now;
		}
		
		
		/**
		 * Get Now - the time the Application started
		 * @return {Date}
		 */
		, getLocalTime : function() {
			return new Date();
		}

		
		/**
		 * Get Browser-defined language
		 * @return {String}
		 */
		, getLang : function() {
			return this.lang;
		}
		

		/**
		 * Get AJAX-Formatted Service Request as data object
		 * @return {Object}
		 */
		, getServiceRequest : function( query ) {
			var getRequest = {
				dataType : 'json'
				, data : $.extend( true, {lang:this.getLang()}, query||{} )
			}
			return getRequest;
		}
		
		
		/**
		 * Get AJAX-Formatted Post Request as data object
		 * @return {Object}
		 */
		, getSubmitRequest : function( url, query ) {
			var postRequest = {
				url : url
				, type : "post"
				, dataType : "json"
				, data : query
			};
			postRequest.data.nonce = this.body.attr("data_nonce");
			return postRequest;
		}


		/**
		 * Get Media Directory
		 * @return {String}
		 */
		, getMediaDir : function() {
			return this.baseURL + "/" + _mediaDir;
		}
		

		/**
		 * Get Agencies
		 * @return {Array} [description]
		 */
		, getAgencies : function() {
			return _agencies;
		}


		/**
		 * Get Clients
		 * @return {Array} [description]
		 */
		, getClients : function() {
			return _clients;
		}


		/**
		 * Get Projects
		 * @return array
		 */
		, getProjects : function() {
			return _projectList;
		}


		/**
		 * Get Technologies
		 * @return array
		 */
		, getTechnologies : function() {
			return _technologyList;
		}


		/**
		 * Get Disciplines
		 * @return array
		 */
		, getDisciplines : function() {
			return _disciplineList;
		}


		/**
		 * Get Project
		 * @param idOrName - Project ID or Name
		 * @return Object
		 */
		, getProject : function( idOrName ) {
			return _projectMap.hasOwnProperty(idOrName) ? _projectMap[idOrName] : null;
		}


		/**
		 * Get Taxonomy
		 * @param id - Taxonomy ID or Slug
		 * @return Object
		 */
		, getTaxonomy : function( id ) 
		{
			var dm = _disciplineMap
				,tm = _technologyMap
				,t = dm.hasOwnProperty(id) ? dm[id] : (tm.hasOwnProperty(id) ? tm[id] : null);
			return t;
		}


		/**
		 * Get Projects of Taxonomy
		 * @param taxType {String}
		 * @param taxId {String}
		 * @return array
		 */
		, getTaxonomyProjects : function( taxType, taxId ) 
		{
			// 	log( "ApplicationData::getTaxonomyProjects", taxType, taxId );
			var taxMap = (taxType=="technology") ? _technologyMap : ((taxType=="discipline") ? _disciplineMap : [])
				,tp = taxMap[taxId].projects || []
				,len = tp.length
				,p = []
				,i;

			for( i=0; i<len; i++ ) {
				p.push( _projectMap[ tp[i].projectId ] );
			}

			return p;
		}

		
		/**
		 * Get Projects from getProject service Request
		 */
		, loadSiteData : function() 
		{	
			var request = this.getServiceRequest();
			
			// Set Service URL and callbacks
			request.url = "/sitedata-cache.json";
			request.success = siteDataLoaded;
			request.error = siteDataLoadError;

			// Call Service
			$.ajax(request);
		}
	};

	
	// ------------------------------------------------------------------------------------------
	// Event Handler Methods
	// ------------------------------------------------------------------------------------------


	function handleIntroComplete()
	{	
		log( "ApplicationData::handleIntroComplete");
		_ref.introCompleted = true;
		setCookie( "intro_complete", true );
	}

	function handleOrientationChange()
	{
		_ref.portraitLayout = Math.abs( window.orientation ) < 45;
		log( _cn + "::handleOrientationChange portraitLayout: ", _ref.portraitLayout );
	}

	
	function handleMediaQueryUpdate( query ) 
	{
		var targetMQ = null;
		$(_ref.mediaQueries).each( function(i,mq){
			targetMQ = mq.matches ? mq : targetMQ;
		});
		_ref.targetMediaQuery = targetMQ;
		
		_ref.scrollLayout = !_ref.isiOS && (targetMQ.name == "desktop" || targetMQ.name == "large");
		_ref.mobileLayout = (targetMQ.name == "mobile" || targetMQ.name == "tablet");

		// log( _cn+"::handleMediaQueryUpdate() mq.name: ", targetMQ.name, " scrollLayout: ", _ref.scrollLayout, " mobileLayout: ", _ref.mobileLayout )

		_ref.$window.trigger( _evt.MediaQueryChange, _ref.targetMediaQuery );
	}

	
	// ------------------------------------------------------------------------------------------
	// Load Handler Methods
	// ------------------------------------------------------------------------------------------


	function sortPartnershipPriority( a, b ) 
	{
		return parseFloat(a.info.priority) - parseFloat(b.info.priority);
	}
	function sortPartnershipName( a, b ) 
	{
		return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	}

	
	/**
	 * Site Data Loaded
	 * @param {Object} result
	 */
	function siteDataLoaded( result ) 
	{
		// Set up data
		createProjectData( result.projects );
		// createTaxonomies( result.taxonomies );
		createPageContent( result.pages );
		_agencies = result.agencies;
		_clients = result.clients;
		_agencies.sort( sortPartnershipName );
		_clients.sort( sortPartnershipName );
		_ref.dataLoaded = true;

		// log( _cn + "::siteDataLoaded" );
		_ref.$window.trigger( _evt.SiteDataLoaded );

	}


	/**
	 * Site Data Load Error
	 * @param {Object} result
	 */
	function siteDataLoadError( result )
	{
		 log( _cn + "::siteDataLoadError", result );
		_ref.$window.trigger( _evt.SiteDataError, {projects:[]} ); 
	}
	
	
	// ------------------------------------------------------------------------------------------
	// Content Creatiton Methods
	// ------------------------------------------------------------------------------------------


	function createPageContent( pages )
	{
		var $page_content = $( "section [data-pagename]", _ref.body )
			,$page
			,cName
			,cData

		$page_content.each( function()
		{
			$page = $(this);
			cName = $page.attr("data-pagename");
			cData = pages.hasOwnProperty( cName ) ? pages[cName] : null;
			if( cData !== null ) { 
				$page.find( ".content" ).append( cData.content );
			}else{
				// log( " could not find page data for location ", cName );
			}
		});
	}


	
	/**
	 * Create Story Data from results
	 * @param {Object} result
	 */
	function createTaxonomies( taxonomies ) 
	{
		_taxonomies = taxonomies;
		_disciplineList = taxonomies.discipline.sort( sortTaxonomyByProjectCount );
		_technologyList = taxonomies.technology.sort( sortTaxonomyByProjectCount );

		var i;
		for( i=_disciplineList.length-1; i>=0; i-- ) {
			_disciplineMap[ _disciplineList[i].name ] = _disciplineMap[ _disciplineList[i].id ] = _disciplineList[i];
		}
		for( i=_technologyList.length-1; i>=0; i-- ) {
			_technologyMap[ _technologyList[i].name ] = _technologyMap[ _technologyList[i].id ] = _technologyList[i];
		}
	}


	/** 
	 * Sort Taxonomies by Project total
	 */
	function sortTaxonomyByProjectCount( a, b ) {
		return b.projects.length - a.projects.length;
	}


	/** 
	 * Sort Taxonomies by Project total
	 */
	function sortProjectByLaunchTime( a, b ) {
		return b.info.launchTime - a.info.launchTime;
	}

	
	/**
	 * Create Story Data from results
	 * @param {Object} result
	 */
	function createProjectData( result ) 
	{
		var i=0
			, len=result.length
			, projectData;

		_projectList = [];

		for( i; i<len; i++ )
		{
			projectData = new fiveleft.ProjectData( result[i] ); 
			_projectMap[ projectData.id ] = _projectMap[ projectData.name ] = projectData;
			_projectList.push( projectData );
		}	
		_projectList.sort( sortProjectByLaunchTime );	
		return _projectList;
	}


	
	// ------------------------------------------------------------------------------------------
	// Cookie Methods
	// ------------------------------------------------------------------------------------------
	
	
	/**
	 * Get Cookie
	 * @param c_name
	 * @returns
	 */
	function getCookie(c_name)
	{
		var i,x,y,c=document.cookie.split(";");
		for (i=0;i<c.length;i++){
			x=c[i].substr(0,c[i].indexOf("="));
			y=c[i].substr(c[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name) return unescape(y);
		}
	}


	function deleteCookie( c_name ) 
	{
		document.cookie = c_name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}


	/**
	 * Set Cookie
	 * @param c_name
	 * @param value
	 * @param exdays
	 */
	function setCookie(c_name,value,exdays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}
	

	// ------------------------------------------------------------------------------------------
	// Class Namespace
	// ------------------------------------------------------------------------------------------
	

	fiveleft.ApplicationData = ApplicationData;
	

}($);


