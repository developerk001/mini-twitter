const router = require('express').Router()
const User = require('./../models/user')

router.route('/signup')
  .get((req, res, next) => {
    res.render('accounts/signup', {err: req.flash('errors')})
  })
  .post((req, res, next) => {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        req.flash('errors', 'user with that email already exists')
        res.redirect('/signup')
      } else {
        var user = new User()
        user.name = req.body.name
        user.email = req.body.email
        user.image = user.avatar()
        user.password = req.body.password
        user.save().then(user => {
          res.redirect('/')
        }).catch(e => {
          next(e)
        })
      }
    }).catch(e => {
      next(e)
    })
  })

module.exports = router
