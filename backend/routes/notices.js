const express = require('express')
const Notice = require('../models/Notice')

const router = express.Router()

// Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 })

    res.json(notices)
  } catch (error) {
    console.log('Get Notices Error:', error.message)

    res.status(500).json({
      message: 'Unable to fetch notices'
    })
  }
})

// Add new notice
router.post('/', async (req, res) => {
  try {
    const { title, description, category } = req.body

    if (!title || !description) {
      return res.status(400).json({
        message: 'Title and description are required'
      })
    }

    const notice = await Notice.create({
      title,
      description,
      category: category || 'General'
    })

    res.status(201).json({
      message: 'Notice added successfully',
      notice
    })
  } catch (error) {
    console.log('Add Notice Error:', error.message)

    res.status(500).json({
      message: 'Unable to add notice'
    })
  }
})

// Delete notice
router.delete('/:id', async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id)

    if (!notice) {
      return res.status(404).json({
        message: 'Notice not found'
      })
    }

    res.json({
      message: 'Notice deleted successfully'
    })
  } catch (error) {
    console.log('Delete Notice Error:', error.message)

    res.status(500).json({
      message: 'Unable to delete notice'
    })
  }
})

module.exports = router