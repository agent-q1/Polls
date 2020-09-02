const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: "Unknown"
  }
});

module.exports = mongoose.model('Counter', CounterSchema);
