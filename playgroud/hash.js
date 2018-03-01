var bcrypt = require('bcryptjs');
var hashed = ''
bcrypt.genSalt(10, function(err, salt) {
  if (err) return console.log(err)
  bcrypt.hash("hash", salt, function(err, hash) {
    if (err) return console.log(err)
    hashed = hash
  })
})
bcrypt.compare("hash", hashed).then((res) => {
  console.log(res)
})
