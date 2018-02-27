// Requiring Globals
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const hsb = require('hbs')
const expressHbs = require('express-handlebars')

// Extracting From Globals
const app = express()

// Requiring Locals
const mainRoutes = require('./routes/main.js')

// Setting Up Middlewares
app.engine('.hbs', expressHbs({defalutLayout: 'layout', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/sherlock', mainRoutes)

// Listening To Port And Handling Error
app.listen(3000, '127.0.0.1', err => {
  if (err) console.log(err)
  else console.log('Sever is running')
})
