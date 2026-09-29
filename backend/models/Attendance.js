const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true
    },

    studentEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ['Present', 'Absent'],
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Attendance = mongoose.model(
  'Attendance',
  attendanceSchema
)

module.exports = Attendance