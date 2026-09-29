const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please fill all fields'
      })
    }

    // Check existing user
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.log('Register Error:', error.message)

    res.status(500).json({
      message: 'Server error'
    })
  }
})
// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check all fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please fill all fields'
      })
    }

    // Find user
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    // Login successful
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: 'smart-campus-token'
    })

  } catch (error) {
    console.log('Login Error:', error.message)

    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router