var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  hbs = require("hbs"),
  map = require('express-sitemap');

// Application Instantiation
var app = module.exports = express();

// Routes
var indexRoutes = require('./routes/index'),
  commonRoutes = require('./routes/common'),
  users = require('./routes/users'),
  api = require('./routes/api');



// View engine setup
// Set Handlebars as Express Rendering engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");



// Set Handlebars as Express Rendering engine
hbs.localsAsTemplateData(app);
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/templates');
hbs.registerHelper('asset', function(file) {
  return app.locals.CDN + file;
});
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


// Settings
app.locals.CDN = '//cdn.fiveleft.com/';
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static( path.join(__dirname, 'public') ));



// Set Routes
app.use('/users', users);
app.use('/api', api);
app.use( commonRoutes );
app.use( indexRoutes );



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
  app.use(logger('dev'));
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


// Sitemap
/**
 * Testing Sitemap outputs  
 * @see https://github.com/hex7c0/express-sitemap/blob/master/examples/nested_router.js
 */
var sitemap = map();
console.log('Child');
console.log(sitemap.generate4(express.Router()));
sitemap.reset();
console.log('Father without Router path');
console.log(sitemap.generate4(app)); // should return {} because no Router path
sitemap.reset();
console.log('Father with Router path');
console.log(sitemap.generate4(app, [ '/' ])); // should return same obj of child with /c path
sitemap.reset();


module.exports = app;
