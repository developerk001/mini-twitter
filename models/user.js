const mongoose = require('mongoose')
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
module.exports = mongoose.model('User', UserSchema)
