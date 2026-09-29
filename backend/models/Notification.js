const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      default: 'General'
    },

    isRead: {
      type: Boolean,
      default: false
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

const Notification = mongoose.model(
  'Notification',
  notificationSchema
)

module.exports = Notification