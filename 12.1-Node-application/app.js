/*Module Dependencies*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // Cookie解析中间件
var bodyParser = require('body-parser');

// Express会话中间件，支持把会话信息存储在Mongo数据库
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)  
var settings = require('./settings')
var flash = require('connect-flash')

/* Routers */
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.moment = require('moment');

/* Cookie Middleware */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 配置静态文件服务器
app.use(flash())

/* Session */
/* 把store参数设置为 MongoStore 实例，把会话信息存储在Mongo数据库 */

app.use(session({
  secret: settings.cookieSecret,
  store: new MongoStore({
      db: settings.db
  })
}))


app.use(function (req, res, next) {
  // console.log('app.usr local')
  
  res.locals.user = req.session.user
  res.locals.post = req.session.post
  var error = req.flash('error')
  res.locals.error = error.length ? error : null

  var success = req.flash('success')
  res.locals.success = success.length ? success : null
  next()
})

/* Routers */
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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

app.listen(3000)
console.log('Express is listening port 3000')

module.exports = app;
