const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true
    },

    studentEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    requestType: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending'
    }
  },
  { timestamps: true }
)

const Request = mongoose.model('Request', requestSchema)

module.exports = Request