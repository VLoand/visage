const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll'); // this uses mongoose

router.post('/', async (req, res) => {
  try {
    const poll = new Poll(req.body);
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:pollId/vote', async (req, res) => {
  const { optionIndex } = req.body;
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    if (!poll.options[optionIndex]) return res.status(400).json({ error: 'Invalid option index' });

    poll.options[optionIndex].votes += 1;
    await poll.save();
    res.json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:pollId', async (req, res) => {
  try {
    const result = await Poll.findByIdAndDelete(req.params.pollId);
    if (!result) return res.status(404).json({ error: 'Poll not found' });
    res.json({ message: 'Poll deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
