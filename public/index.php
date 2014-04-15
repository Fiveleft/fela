<?php 
    // require_once "includes/site_settings.php";
    require_once "includes/config.php";
 ?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content=""> 
        <base href="<?php echo $config->base_url; ?>" />
        <title><?php echo $config->pagetitle; ?></title>
        <script type="text/javascript">
            window.FIVELEFT = {
                _baseURL : "<?php echo $config->base_url; ?>"
                ,_environment : "<?php echo $config->environment; ?>"
                ,_mediaDir : "<?php echo $config->media_dir; ?>"
                ,fontsloaded:false 
                ,onfontloaded:function(){
                    FIVELEFT.fontsloaded=true;
                }
            };
            (function() {
             var config = {kitId: 'ufr5epn', scriptTimeout: 3000, active:FIVELEFT.onfontloaded};
             var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)})();
        </script>
        <link rel="stylesheet" href="css/main.css">

        <?php if( $config->environment == "local" ) : ?>
        <script src="js/vendor/modernizr.min.js"></script>
        <?php else : ?>
        <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
        <?php endif; ?> 
    </head>
    
    <body data-loadstate="preload">
        <div id="dat-gui" style="z-index:999999; position:fixed; top:0; right:0;"></div>
        <header id="header">
            <?php require_once( "./includes/navigation.php" ); ?>
        </header>
        <div id="main">
            <div class="main-inner section-container">
                <?php require_once( "./includes/section-welcome.php" ); ?>                
                <?php require_once( "./includes/section-work.php" ); ?>                
                <?php require_once( "./includes/section-info.php" ); ?> 
                <?php require_once( "./includes/section-drawing.php" ); ?>
                <?php require_once( "./includes/section-connect.php" ); ?>
            </div>
        </div>
        <div id="fb-root"></div>
        <?php require_once( "includes/templates.php" ); ?>
        <?php require_once( "includes/js-body.php" ); ?>
    </body>
</html>
