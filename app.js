var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport")


//security api
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

//connectDatabase
const connectDB = require('./src/config/connectDB')

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

var app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(helmet())
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//init passport
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
