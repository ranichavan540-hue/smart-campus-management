const express = require('express')
const Request = require('../models/Request')

const router = express.Router()

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 })

    res.json(requests)
  } catch (error) {
    console.log('Get Requests Error:', error.message)

    res.status(500).json({
      message: 'Unable to fetch requests'
    })
  }
})

// Submit new request
router.post('/', async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      requestType,
      description
    } = req.body

    if (
      !studentName ||
      !studentEmail ||
      !requestType ||
      !description
    ) {
      return res.status(400).json({
        message: 'Please fill all required fields'
      })
    }

    const request = await Request.create({
      studentName,
      studentEmail,
      requestType,
      description
    })

    res.status(201).json({
      message: 'Request submitted successfully',
      request
    })
  } catch (error) {
    console.log('Submit Request Error:', error.message)

    res.status(500).json({
      message: 'Unable to submit request'
    })
  }
})

// Update request status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!request) {
      return res.status(404).json({
        message: 'Request not found'
      })
    }

    res.json({
      message: 'Request status updated successfully',
      request
    })
  } catch (error) {
    console.log('Update Request Error:', error.message)

    res.status(500).json({
      message: 'Unable to update request status'
    })
  }
})

module.exports = router