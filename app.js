var express = require("express")
	,routes = require("./routes")
	,redirect = require("express-redirect")
	,fs = require("fs")
	,http = require("http")
	,sockets = require("socket.io")
	,path = require("path")
	,envConfig = require("./config.json")
	,exphbs = require("express3-handlebars")
	,logfmt = require("logfmt");

var app = express()
	,router = express.Router()
	,server = http.createServer(app)
	,io = sockets.listen(server)
	,node_env = process.env.NODE_ENV || 'development'
	,config = envConfig[node_env]
	,routeFiles = fs.readdirSync( path.join(__dirname, "routes") );


app.set( "config", config );
app.set( "pageContent", {
	title : "Fiveleft is a creative digital studio focusing on interactive development located in beautiful Seattle WA"
});


var data = {
    content : app.get("pageContent")
    ,config : app.get("config")
  };
  // var pagePattern = "\\/|\/work|\/work\/(\d+)\"





app.use(express.static( path.join(__dirname, '/public')) );



// app.get('/work', function (req, res){
// 	res.render('index', data);
// });
// app.get(/^\/work(\/\w+)*$/, function (req, res){
// 	// var id = req.params.id;
// 	// console.log( " using id: " + id );
// 	res.render('index', data);
// 	// res.location("/");
// });
// app.get('/info', function (req, res){
// 	res.render('index', data);
// });
// app.get('/info/:id', function (req, res){
// 	res.render('index', data);
// });
// app.get('/connect', function (req, res){
// 	res.render('index', data);
// });

// app.use( router );
// app.get( /^\/(?:js\/(?=.+)|json\/(?=.+)|css\/(?=.+)|img\/(?=.+)|audio\/(?=.+)|video\/(?=.+)|robots\.txt\b|humans\.txt\b|favicon\.ico\b)/, express.static(__dirname + '/public') );

// app.use( "/", express.static(__dirname + '/public') );
// app.use( "/", express.static(__dirname + '/public') );
// app.get('*', function(req, res) {
//   res.redirect('/');
// });

// app.use( "/js", express.static(__dirname + '/public/js') );
// app.use( "/img", express.static(__dirname + '/public/img') );
// app.use( "/css", express.static(__dirname + '/public/css') );
// redirect(app);
// app.redirect( "/work/:p", "/" );

// Use Routefiles to create unique routes
routeFiles.forEach( function( file ) {
	var filepath = path.join( __dirname, "routes", file )
		,route = require(filepath);
	route.init(app);
});
// app.get("/*", function (req, res){
// 	res.render('index', data);
// });


// Set Handlebars as Express Rendering Engine
app.engine( "hbs", exphbs({
	partialsDir: __dirname + "/views/partials"
	,extname: ".hbs"
	,defaultLayout: "main"
	,helpers: {
      block: function(name){
        var blocks = this._blocks;
            content = blocks && blocks[name];
        return content ? content.join('\n') : null;
      },
      contentFor: function(name, options){
        var blocks = this._blocks || (this._blocks = {});
            block = blocks[name] || (blocks[name] = []); //Changed this to [] instead of {}
        block.push(options.fn(this));
      }
    }
}) );
app.set( "view engine", "hbs" );
app.set( "views", __dirname + "/views" );




app.set( "port", process.env.PORT || 8888 );

// app.use( express.bodyParser() );
// app.use( express.methodOverride() );
// app.use("/media", express.static(__dirname + '/media') );
// app.use("/wordpress", express.static(__dirname + '/public/wordpress') );
// app.get( "/", function(req,res) {
// 	res.render('index', {title:"Page Title Found!", config:config});
// });

app.listen( app.get('port'), function() {
  console.log("Listening on " + app.get('port') );
});
