var createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  session = require('express-session'),
  fileUpload = require('express-fileupload');

var staticRouter = require('./routes/static.routes'),
  chatRouter = require('./routes/chat.routes'),
  modalRouter = require('./routes/modal.routes'),
  ajaxRouter = require('./routes/ajax/modal.ajax'),
  searchRouter = require('./routes/search.routes'),
  authRouter = require('./routes/auth.routes'),
  cabinetRouter = require('./routes/cabinet.routes'),
  dragRouter = require('./routes/dragNdrop.routes'),
  newsRouter = require('./routes/news.routes');

var checkAuth = require('./utils/checkAuth');

// Подключаем чат
var chat_app = require("zteam-chat");
chat_app.run(9000);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev')); // логирование
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(fileUpload({
  createParentPath: true
}));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  if (!req.session.userId) {
    req.session.userId = 0;
  }
  next();
})

app.use(function(req, res, next) {
  res.locals = {
    userId: req.session.userId
  };
  //console.log(res.locals.userId);
  next();
});

app.use('/chat', chatRouter);
app.use('/modal', modalRouter);
app.use('/ajax', ajaxRouter);
app.use('/search', searchRouter);
app.use('/auth', authRouter);
app.use('/cabinet', checkAuth, cabinetRouter);
app.use('/drag', dragRouter);
app.use('/news', newsRouter);
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
