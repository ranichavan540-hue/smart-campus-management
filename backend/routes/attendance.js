const express = require('express')
const Attendance = require('../models/Attendance')

const router = express.Router()

// Get all attendance
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .sort({ date: -1 })

    res.json(attendance)
  } catch (error) {
    console.log('Get Attendance Error:', error.message)

    res.status(500).json({
      message: 'Unable to fetch attendance'
    })
  }
})

// Add attendance
router.post('/', async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      subject,
      date,
      status
    } = req.body

    if (
      !studentName ||
      !studentEmail ||
      !subject ||
      !date ||
      !status
    ) {
      return res.status(400).json({
        message: 'Please fill all fields'
      })
    }

    const attendance = await Attendance.create({
      studentName,
      studentEmail,
      subject,
      date,
      status
    })

    res.status(201).json({
      message: 'Attendance added successfully',
      attendance
    })
  } catch (error) {
    console.log('Add Attendance Error:', error.message)

    res.status(500).json({
      message: 'Unable to add attendance'
    })
  }
})

// Update attendance
router.put('/:id', async (req, res) => {
  try {
    const attendance =
      await Attendance.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )

    if (!attendance) {
      return res.status(404).json({
        message: 'Attendance not found'
      })
    }

    res.json({
      message: 'Attendance updated successfully',
      attendance
    })
  } catch (error) {
    console.log('Update Attendance Error:', error.message)

    res.status(500).json({
      message: 'Unable to update attendance'
    })
  }
})

// Delete attendance
router.delete('/:id', async (req, res) => {
  try {
    const attendance =
      await Attendance.findByIdAndDelete(req.params.id)

    if (!attendance) {
      return res.status(404).json({
        message: 'Attendance not found'
      })
    }

    res.json({
      message: 'Attendance deleted successfully'
    })
  } catch (error) {
    console.log('Delete Attendance Error:', error.message)

    res.status(500).json({
      message: 'Unable to delete attendance'
    })
  }
})

module.exports = router