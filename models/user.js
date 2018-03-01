const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowecase: true,
    minlength: 1,
    required: true
  }, name: {
    type: String,
    minlength: 1,
    required: true
  }, password: {
    type: String,
    minlength: 6,
    required: true
  }, image: {
    type: String,
    minlength: 1
  }, tweets: [{
    tweet: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet'
    }
  }]
})

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  if (this.password) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next()
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next()
        this.password = hash
        next()
      })
    })
  }
})

UserSchema.methods.avatar = function(size = 200) {
  if (!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`
  var md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

UserSchema.methods.isMyPassword = async password => {
  return await brcypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
