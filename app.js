var express = require("express")
	,routes = require("./routes")
	,mysql = require("mysql")
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
	,socketCount = 0
	,port = process.env.PORT || 3000
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


// Catch Public Static files
app.use( express.static( path.join(__dirname, '/public')) );


// Use Routefiles to create unique routes
routeFiles.forEach( function( file ) {
	var filepath = path.join( __dirname, "routes", file )
		,route = require(filepath);
	route.init(app);
});


// Socket Connection
// io.sockets.on('connection', function (socket) {
// 	socket.emit('news', { hello: 'world' });
// 	socket.on('my other event', function (data) {
// 		console.log(data);
// 	});
// });
// 

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
app.set( "port", port );

app.listen( app.get("port"), function() {
	console.log("Listening on " + app.get("port") );
});
