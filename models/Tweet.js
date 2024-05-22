const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    text: String,
    read: { type: Boolean, default: false }
  });
  
const Tweet = mongoose.model('Tweet', tweetSchema);
  
module.exports = Tweet;