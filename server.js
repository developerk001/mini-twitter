// Requiring Globals
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const hsb = require('hbs')
const expressHbs = require('express-handlebars')
const port = process.env.PORT || 3000

// Extracting From Globals
const app = express()

// Requiring Locals
const mainRoutes = require('./routes/main')
const db = require('./db/db');

// Setting Up Middlewares
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(mainRoutes)

// 1:05:49
// Listening To Port And Handling Error
app.listen(port,  err => {
  if (err) console.log(err)
  else console.log('Sever is running')
})
