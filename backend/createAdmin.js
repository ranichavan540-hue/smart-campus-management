const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const User = require('./models/User')

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB Connected')

    const adminEmail = 'admin@smartcampus.com'
    const adminPassword = 'Admin@123'

    const existingAdmin = await User.findOne({
      email: adminEmail
    })

    if (existingAdmin) {
      console.log('Admin already exists')
      process.exit()
    }

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      10
    )

    const admin = await User.create({
      name: 'SmartCampus Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    })

    console.log('Admin Created Successfully')
    console.log('Email:', admin.email)
    console.log('Role:', admin.role)

    process.exit()

  } catch (error) {
    console.log('Admin Creation Error:', error.message)
    process.exit(1)
  }
}

createAdmin()