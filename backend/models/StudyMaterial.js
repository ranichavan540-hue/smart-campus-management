const mongoose = require('mongoose')

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true,
      default: ''
    },

    fileName: {
      type: String,
      required: true
    },

    filePath: {
      type: String,
      required: true
    },

    fileType: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const StudyMaterial = mongoose.model(
  'StudyMaterial',
  studyMaterialSchema
)

module.exports = StudyMaterial