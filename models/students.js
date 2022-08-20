const mongoose = require('mongoose')

const Students = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model("Students", Students);