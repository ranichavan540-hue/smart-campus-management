const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const StudyMaterial = require('../models/StudyMaterial')

const router = express.Router()

// =========================
// FILE UPLOAD SETTINGS
// =========================

const uploadFolder = path.join(
  __dirname,
  '..',
  'uploads',
  'study-materials'
)

fs.mkdirSync(uploadFolder, {
  recursive: true
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1E9) +
      path.extname(file.originalname)

    cb(null, uniqueName)
  }
})

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      '.pdf',
      '.doc',
      '.docx',
      '.ppt',
      '.pptx'
    ]

    const extension =
      path.extname(file.originalname).toLowerCase()

    if (allowedTypes.includes(extension)) {
      cb(null, true)
    } else {
      cb(
        new Error(
          'Only PDF, DOC, DOCX, PPT and PPTX files are allowed'
        )
      )
    }
  }
})

// =========================
// GET ALL STUDY MATERIALS
// =========================

router.get('/', async (req, res) => {
  try {
    const materials = await StudyMaterial.find()
      .sort({ createdAt: -1 })

    res.json(materials)
  } catch (error) {
    console.log(
      'Get Study Materials Error:',
      error.message
    )

    res.status(500).json({
      message: 'Unable to fetch study materials'
    })
  }
})

// =========================
// UPLOAD STUDY MATERIAL
// =========================

router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const {
        title,
        subject,
        description
      } = req.body

      if (!title || !subject || !req.file) {
        return res.status(400).json({
          message:
            'Title, subject and file are required'
        })
      }

      const material =
        await StudyMaterial.create({
          title,
          subject,
          description: description || '',
          fileName: req.file.originalname,
          filePath: `/uploads/study-materials/${req.file.filename}`,
          fileType: req.file.mimetype
        })

      res.status(201).json({
        message:
          'Study material uploaded successfully',
        material
      })
    } catch (error) {
      console.log(
        'Upload Study Material Error:',
        error.message
      )

      res.status(500).json({
        message:
          'Unable to upload study material'
      })
    }
  }
)

// =========================
// DELETE STUDY MATERIAL
// =========================

router.delete('/:id', async (req, res) => {
  try {
    const material =
      await StudyMaterial.findByIdAndDelete(
        req.params.id
      )

    if (!material) {
      return res.status(404).json({
        message: 'Study material not found'
      })
    }

    res.json({
      message:
        'Study material deleted successfully'
    })
  } catch (error) {
    console.log(
      'Delete Study Material Error:',
      error.message
    )

    res.status(500).json({
      message:
        'Unable to delete study material'
    })
  }
})

module.exports = router