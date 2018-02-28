const mongoose = require('mongoose')
const config = require('./../config/config')
mongoose.connect(config.db, err => {
  if (err) return console.log('Unable to conect with db' + err)
  console.log('Connected to mongo server')
})
