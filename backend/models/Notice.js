const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema(
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

    category: {
      type: String,
      default: 'General'
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

const Notice = mongoose.model('Notice', noticeSchema)

module.exports = Notice