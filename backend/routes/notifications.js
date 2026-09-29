const express = require('express')
const Notification = require('../models/Notification')

const router = express.Router()

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })

    res.json(notifications)
  } catch (error) {
    console.log('Get Notifications Error:', error.message)

    res.status(500).json({
      message: 'Unable to fetch notifications'
    })
  }
})

// Create notification
router.post('/', async (req, res) => {
  try {
    const {
      title,
      message,
      type
    } = req.body

    if (!title || !message) {
      return res.status(400).json({
        message: 'Please fill all required fields'
      })
    }

    const notification = await Notification.create({
      title,
      message,
      type: type || 'General'
    })

    res.status(201).json({
      message: 'Notification created successfully',
      notification
    })
  } catch (error) {
    console.log(
      'Create Notification Error:',
      error.message
    )

    res.status(500).json({
      message: 'Unable to create notification'
    })
  }
})
// Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        { isRead: true },
        { new: true }
      )

    if (!notification) {
      return res.status(404).json({
        message: 'Notification not found'
      })
    }

    res.json({
      message: 'Notification marked as read',
      notification
    })
  } catch (error) {
    console.log(
      'Mark Notification Read Error:',
      error.message
    )

    res.status(500).json({
      message: 'Unable to mark notification as read'
    })
  }
})

// Delete notification
router.delete('/:id', async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndDelete(
        req.params.id
      )

    if (!notification) {
      return res.status(404).json({
        message: 'Notification not found'
      })
    }

    res.json({
      message: 'Notification deleted successfully'
    })
  } catch (error) {
    console.log(
      'Delete Notification Error:',
      error.message
    )

    res.status(500).json({
      message: 'Unable to delete notification'
    })
  }
})

module.exports = router