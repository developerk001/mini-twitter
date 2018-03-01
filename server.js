// Requiring Globals
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const hsb = require('hbs')
const expressHbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const port = process.env.PORT || 3000
const passport = require('passport')
const cookieParser = require('cookie-parser')

// Extracting From Globals
const app = express()

// Requiring Locals
const mainRoutes = require('./routes/main')
const userRoutes = require('./routes/user')
const db = require('./db/db');
const config = require('./config/config')

// Setting Up Middlewares
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret,
  store: new MongoStore({url: config.db, autoReconnect: true})
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(mainRoutes)
app.use(userRoutes)

// 1:05:49
// Listening To Port And Handling Error
app.listen(port,  err => {
  if (err) console.log(err)
  else console.log('Sever is running')
})
