const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const aiRoutes = require('./routes/ai')
const studentRoutes = require('./routes/students')
const noticeRoutes = require('./routes/notices')
const eventRoutes = require('./routes/events')
const requestRoutes = require('./routes/requests')
const attendanceRoutes = require('./routes/attendance')
console.log('Attendance Routes Loaded Successfully')

const studyMaterialRoutes = require('./routes/studyMaterials')

const notificationRoutes = require('./routes/notifications')
console.log('Notification Routes Loaded Successfully')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads'))

// Authentication Routes
app.use('/api/auth', authRoutes)

app.use('/api/ai', aiRoutes)

app.use('/api/students', studentRoutes)

app.use('/api/notices', noticeRoutes)

app.use('/api/events', eventRoutes)

app.use('/api/requests', requestRoutes)

app.use('/api/attendance', attendanceRoutes)

app.use('/api/study-materials', studyMaterialRoutes)

app.use('/api/notifications', notificationRoutes)

app.get('/api/events-test', (req, res) => {
  res.send('Events test is working')
})

app.get('/api/ai/test', (req, res) => {
  res.send('AI route is working')
})
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully')
  })
  .catch((error) => {
    console.log('MongoDB Connection Error:', error.message)
  })

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'SmartCampus Backend Running 🚀'
  })
})
app.get('/attendance-test', (req, res) => {
  res.send('ATTENDANCE TEST WORKING')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})