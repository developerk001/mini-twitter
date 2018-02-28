const router = require('express').Router()
const User = require('./../models/user')
router.get('/', (req, res, next) => {
  res.render('main/landing')
})

router.get('/create-new-user', (req, res, next) => {
  var user = new User()
  user.email = 'developerk@sohail.com'
  user.name = 'Sohail Khan'
  user.password = 'this is my pass'
  user.save(err => {
    if (err) return console.log(err)
    res.json('User Added')
  })
})
module.exports = router
