const express = require('express')
const User = require('../models/User')

const router = express.Router()

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await User.find(
      { role: 'student' },
      { password: 0 }
    ).sort({ createdAt: -1 })

    res.json(students)
  } catch (error) {
    console.log('Get Students Error:', error.message)

    res.status(500).json({
      message: 'Unable to fetch students'
    })
  }
})

module.exports = router