const router = require('express').Router()
router.get('/', (req, res, next) => {
  res.json('main/landing')
})
module.exports = router
