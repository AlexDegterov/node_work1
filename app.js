var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var staticRouter = require('./routes/static.routes');
var chatRouter = require('./routes/chat.routes');
var baseRouter = require('./routes/base.routes');

// Подключаем чат
var chat_app = require("zteam-chat");
chat_app.run(9000);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use('/chat', chatRouter);
app.use('/base', baseRouter);
app.use('/', staticRouter);

app.use(function(req, res, next) {
  next(createError(404)); 
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8002);
module.exports = app;
