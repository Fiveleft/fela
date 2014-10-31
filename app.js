var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  hbs = require("hbs"),
  CDN = require("express-simple-cdn");


// Routes
var routes = require('./routes/index'),
  users = require('./routes/users'),
  api = require('./routes/api');


// Application Instantiation
var app = express();

// View engine setup
// Set Handlebars as Express Rendering engine
app.set('views', path.join(__dirname, 'views'));
app.set( "view engine", "hbs" );

// Set Handlebars as Express Rendering engine
hbs.localsAsTemplateData(app);
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/templates');
hbs.registerHelper('block', function(name){
  var blocks = this._blocks;
  var content = blocks && blocks[name];
  return content ? content.join('\n') : null;
});
hbs.registerHelper('contentFor', function(name, options){
  var blocks = this._blocks || (this._blocks = {});
  var block = blocks[name] || (blocks[name] = []); //Changed this to [] instead of {}
  block.push(options.fn(this)); 
});

// app.engine( "hbs", exphbs({
//   partialsDir: __dirname + "/views/partials",
//   extname: ".hbs",
//   defaultLayout: "main",
//   helpers: {
//     cdn: function (obj, fn) {
//       return fn({asset:app.locals.CDN + obj});
//     },
//     block: function(name){
//       var blocks = this._blocks;
//       var content = blocks && blocks[name];
//       return content ? content.join('\n') : null;
//     },
//     contentFor: function(name, options){
//       var blocks = this._blocks || (this._blocks = {});
//       var block = blocks[name] || (blocks[name] = []); //Changed this to [] instead of {}
//       block.push(options.fn(this));
//     }
//   }
// }));

// Settings
app.locals.CDN = function(path) { return CDN(path, '//cms.fiveleft.com/media/') };
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

// Set Routes
app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log( err );
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.locals.CDN = function(path) { return CDN(path, '//cms.fiveleft.com/media/') };
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
