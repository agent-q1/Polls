const mongoose = require('mongoose');
// const CounterSchema= require('./Counter.js')



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


const PollsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Unknown"
  },
  options:[CounterSchema]
});




module.exports = mongoose.model('Polls', PollsSchema);
