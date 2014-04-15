
if( typeof fiveleft === "undefined" ) var fiveleft={};

fiveleft.Event = {

	DOMChange : "Application.DOMChange"
	,AffixTop : "Application.AffixTop"
	,Start : "Application.Start"
	,IntroSequenceChange : "Application.IntroSequenceChange"
	,IntroSequenceComplete : "Application.IntroSequenceComplete"
	
	,OpenMenu : "Navigation.OpenMenu"
	,OpenMenuComplete : "Navigation.OpenMenuComplete"
	,CloseMenu : "Navigation.CloseMenu"
	,CloseMenuComplete : "Navigation.CloseMenuComplete"

	,OpenDraw : "Navigation.OpenDraw"
	,OpenDrawComplete : "Navigation.OpenDrawComplete"
	,CloseDraw : "Navigation.CloseDraw"
	,CloseDrawComplete : "Navigation.CloseDrawComplete"
	
	,SiteDataLoaded : "ApplicationData.SiteDataLoaded"
	,SiteDataError : "ApplicationData.SiteDataError"
	,MediaQueryChange : "ApplicationData.MediaQueryChange"
};
