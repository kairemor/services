const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet');

// Endpoint to save tweets
router.post('', async (req, res) => {
  const tweets = req.body.tweets;
  try {
    await Tweet.insertMany(tweets);
    res.status(201).send('Tweets saved!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to get a random unread tweet and mark it as read
router.get('/random', async (req, res) => {
  try {
    const tweet = await Tweet.findOneAndUpdate({ read: false }, { read: true }, { new: true });
    if (tweet) {
      res.json(tweet);
    } else {
      res.status(404).send('No unread tweets available.');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
