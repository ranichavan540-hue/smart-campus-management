const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    venue: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      default: 'General'
    }
  },
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event