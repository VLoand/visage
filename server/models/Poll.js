const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      votes: { type: Number, default: 0 },
    },
  ],
  createdBy: {
    type: String, // could be userId or email, depends on how you auth
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Poll', pollSchema, "polls");
