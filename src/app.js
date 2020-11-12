var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session= require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
const localUserCheck = require('./middlewares/localUserCheck');


var app = express();
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
//app.use(bodyParser.json())

app.listen(3030,() => console.log('servidor levantado en el puerto 3030'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(session({secret:"sound power"}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(localUserCheck);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);



// catch 404 and forward to error handler
app.use ((req, res, next) => {
  res.status(404).render("not-found")
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

module.exports = app;
