const express = require('express')
const Event = require('../models/Event')

const router = express.Router()

router.get('/test', (req, res) => {
  res.send('Events route is working')
})

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    res.json(events)
  } catch (error) {
    console.log('Get Events Error:', error.message)
    res.status(500).json({ message: 'Unable to fetch events' })
  }
})

// Add new event
router.post('/', async (req, res) => {
  try {
    const { title, description, date, venue, category } = req.body

    if (!title || !description || !date || !venue) {
      return res.status(400).json({
        message: 'Please fill all required fields'
      })
    }

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      category: category || 'General'
    })

    res.status(201).json({
      message: 'Event added successfully',
      event
    })
  } catch (error) {
    console.log('Add Event Error:', error.message)
    res.status(500).json({
      message: 'Unable to add event'
    })
  }
})

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    res.json({
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.log('Delete Event Error:', error.message)
    res.status(500).json({
      message: 'Unable to delete event'
    })
  }
})

module.exports = router