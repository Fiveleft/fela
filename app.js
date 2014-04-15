var express = require("express")
	,routes = require("./routes")
	,fs = require("fs")
	,http = require("http")
	,sockets = require("socket.io")
	,path = require("path")
	,envConfig = require("./config.json")
	,siteData = require("./sitedata.json")
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


app.use( express.static( path.join(__dirname, '/public')) );

// app.get( "/sitedata-cache.json", function(req,res){

// })

// Use Routefiles to create unique routes
routeFiles.forEach( function( file ) {
	var filepath = path.join( __dirname, "routes", file )
		,route = require(filepath);
	route.init(app);
});


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
app.listen( app.get('port'), function() {
  console.log("Listening on " + app.get('port') );
});
