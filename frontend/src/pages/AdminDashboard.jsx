import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



function AdminDashboard() {
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [loadingStudents, setLoadingStudents] = useState(true)

  const [notices, setNotices] = useState([])
  const [loadingNotices, setLoadingNotices] = useState(true)

  const [noticeTitle, setNoticeTitle] = useState('')
  const [noticeDescription, setNoticeDescription] = useState('')
  const [noticeCategory, setNoticeCategory] = useState('General')
  const [noticeMessage, setNoticeMessage] = useState('')
  const [events, setEvents] = useState([])
  const [requests, setRequests] = useState([])
  const [attendance, setAttendance] = useState([])
  const [studyMaterials, setStudyMaterials] = useState([])

  const [studyMaterialForm, setStudyMaterialForm] = useState({
    title: '',
    subject: '',
    description: '',
    file: null
  })

  const [studyMaterialMessage, setStudyMaterialMessage] = useState('')

  const [attendanceForm, setAttendanceForm] = useState({
    studentName: '',
    studentEmail: '',
    subject: '',
    date: '',
    status: 'Present'
  })
  const [loadingRequests, setLoadingRequests] = useState(true)

  const [notifications, setNotifications] = useState([])
  const [loadingNotifications, setLoadingNotifications] = useState(true)

  const [notificationTitle, setNotificationTitle] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('General')
  const [notificationStatus, setNotificationStatus] = useState('')

  const [loadingEvents, setLoadingEvents] = useState(true)

  const [eventTitle, setEventTitle] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventVenue, setEventVenue] = useState('')
  const [eventCategory, setEventCategory] = useState('General')
  const [eventMessage, setEventMessage] = useState('')

  const user = JSON.parse(
    localStorage.getItem('smartCampusUser') || '{}'
  )

  // Fetch Notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          'https://smart-campus-management-wmbi.onrender.com/api/notices'
        )

        const data = await response.json()

        if (response.ok) {
          setNotices(data)
        }
      } catch (error) {
        console.log('Notices Fetch Error:', error)
      } finally {
        setLoadingNotices(false)
      }
    }

    fetchNotices()
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          'https://smart-campus-management-wmbi.onrender.com/api/events'
        )

        const data = await response.json()

        if (response.ok) {
          setEvents(data)
        }
      } catch (error) {
        console.log('Events Fetch Error:', error)
      } finally {
        setLoadingEvents(false)
      }
    }

    fetchEvents()
  }, [])

  // Fetch Students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          'https://smart-campus-management-wmbi.onrender.com/api/students'
        )

        const data = await response.json()

        if (response.ok) {
          setStudents(data)
        }
      } catch (error) {
        console.log('Students Fetch Error:', error)
      } finally {
        setLoadingStudents(false)
      }
    }

    fetchStudents()
  }, [])
  // Fetch Requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          'https://smart-campus-management-wmbi.onrender.com/api/requests'
        )

        const data = await response.json()

        if (response.ok) {
          setRequests(data)
        }
      } catch (error) {
        console.log('Requests Fetch Error:', error)
      } finally {
        setLoadingRequests(false)
      }
    }

    fetchRequests()
  }, [])
  // Fetch Attendance
  useEffect(() => {
    fetchAttendance()
  }, [])
  const fetchAttendance = async () => {
    try {
      const response = await fetch(
        'https://smart-campus-management-wmbi.onrender.com/api/attendance'
      )

      const data = await response.json()

      if (response.ok) {
        setAttendance(data)
      } else {
        console.log(
          'Attendance Fetch Error:',
          data
        )
      }
    } catch (error) {
      console.log(
        'Attendance Fetch Error:',
        error
      )
    }
  }

  // Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          'https://smart-campus-management-wmbi.onrender.com/api/notifications'
        )

        const data = await response.json()

        if (response.ok) {
          setNotifications(data)
        }
      } catch (error) {
        console.log(
          'Notifications Fetch Error:',
          error
        )
      } finally {
        setLoadingNotifications(false)
      }
    }

    fetchNotifications()
  }, [])

  const handleAddNotice = async (e) => {
    e.preventDefault()

    if (!noticeTitle || !noticeDescription) {
        setNoticeMessage('Please fill all required fields.')
        return
    }

    try {
        const response = await fetch(
            'https://smart-campus-management-wmbi.onrender.com/api/notices',
            {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  title: noticeTitle,
                  description: noticeDescription,
                  category: noticeCategory
              })
            }
          )

          const data = await response.json()

          if (response.ok) {
            setNoticeMessage('Notice added successfully!')

            setNoticeTitle('')
            setNoticeDescription('')
            setNoticeCategory('General')
          } else {
            setNoticeMessage(
              data.message || 'Unable to add notice'
            )
          }
        } catch (error) {
          console.log('Add Notice Error:', error)
          setNoticeMessage('Unable to connect to server')
        }
      }

      const handleLogout = () => {
        localStorage.removeItem('smartCampusUser')
        localStorage.removeItem('smartCampusToken')
        navigate('/login')
      }

      const handleAddNotification = async (e) => {
        e.preventDefault()

        if (!notificationTitle || !notificationMessage) {
          setNotificationStatus(
            'Please fill all required fields.'
          )
          return
        }

        try {
          const response = await fetch(
            'https://smart-campus-management-wmbi.onrender.com/api/notifications',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: notificationTitle,
              message: notificationMessage,
              type: notificationType
            })
          }
        )

        const data = await response.json()

        if (response.ok) {
          setNotificationStatus(
            'Notification created successfully! 🔔'
          )

          setNotifications([
            data.notification,
            ...notifications
          ])

          setNotificationTitle('')
          setNotificationMessage('')
          setNotificationType('General')
        } else {
          setNotificationStatus(
            data.message ||
            'Unable to create notification'
          )
        }
      } catch (error) {
        console.log(
        'Create Notification Error:',
        error
        )

        setNotificationStatus(
          'Unable to connect to server'
        )
      }
    }
    const handleDeleteNotification = async (notificationId) => {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this notification?'
      )

      if (!confirmDelete) {
        return
      }

      try {
        const response = await fetch(
          `https://smart-campus-management-wmbi.onrender.com/api/notifications/${notificationId}`,
        {
          method: 'DELETE'
        }
      )

      const data = await response.json()

      if (response.ok) {
        setNotifications(
          notifications.filter(
            (notification) =>
              notification._id !== notificationId
            )
          )

          setNotificationStatus(
            'Notification deleted successfully! 🗑️'
          )
        } else {
          setNotificationStatus(
            data.message ||
            'Unable to delete notification'
          )
        }
      } catch (error) {
        console.log(
          'Delete Notification Error:',
          error
        )

        setNotificationStatus(
          'Unable to connect to server'
        )
      }
   }
   const handleDeleteAttendance = async (attendanceId) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this attendance record?'
  )

  if (!confirmDelete) {
    return
  }

  try {
    const response = await fetch(
      `https://smart-campus-management-wmbi.onrender.com/api/attendance/${attendanceId}`,
      {
        method: 'DELETE'
      }
    )

    const data = await response.json()

    if (response.ok) {
      setAttendance(
        attendance.filter(
          (record) => record._id !== attendanceId
        )
      )

      alert('Attendance deleted successfully! 🗑️')
    } else {
      alert(
        data.message ||
        'Unable to delete attendance'
      )
    }
  } catch (error) {
    console.log(
      'Delete Attendance Error:',
      error
    )

    alert('Unable to connect to server')
  }
}
const handleStudyMaterialUpload = async (e) => {
  e.preventDefault()

  if (
    !studyMaterialForm.title ||
    !studyMaterialForm.subject ||
    !studyMaterialForm.file
  ) {
    setStudyMaterialMessage(
      'Please enter title, subject and select a file.'
    )
    return
  }

  try {
    const formData = new FormData()

    formData.append('title', studyMaterialForm.title)
    formData.append('subject', studyMaterialForm.subject)
    formData.append('description', studyMaterialForm.description)
    formData.append('file', studyMaterialForm.file)

    const response = await fetch(
      'https://smart-campus-management-wmbi.onrender.com/api/study-materials/upload',
      {
        method: 'POST',
        body: formData
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Upload failed'
      )
    }
    setStudyMaterials((prev) => [
      data.material,
      ...prev
    ])

    setStudyMaterialMessage(
      'Study material uploaded successfully! ✅'
    )

    setStudyMaterialForm({
      title: '',
      subject: '',
      description: '',
      file: null
    })

    e.target.reset()

  } catch (error) {
    console.error(
      'Study Material Upload Error:',
      error
    )

    setStudyMaterialMessage(
      error.message ||
      'Unable to upload study material.'
    )
  }
}

  const analyticsData = [
  {
    category: 'Students',
    count: students.length
  },
  {
    category: 'Notices',
    count: notices.length
  },
  {
    category: 'Events',
    count: events.length
  },
  {
    category: 'Requests',
    count: requests.length
  }
]
       

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          🎓 SmartCampus
        </div>

        <div className="dashboard-nav-links">

          <Link to="/admin-dashboard">
            🏠 Dashboard
          </Link>

          <a
            href="#students-section"
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById('students-section')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            👨‍🎓 Students
          </a>

          <a
            href="#notices-section"
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById('notices-section')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            📢 Notices
          </a>

          <a
            href="#events-section"
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById('events-section')
                ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              📅 Events
            </a>

            <a
              href="#requests-section"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById('requests-section')
                  ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                📝 Requests
            </a>
            <a
              href="#analytics-section"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById('analytics-section')
                  ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                📊 Analytics
              </a>

            <Link to="/">
              Home
            </Link>

            <button onClick={handleLogout}>
              🚪 Logout
            </button>

        </div>

      </nav>

      {/* Main Content */}
      <main className="dashboard-content">

        {/* Welcome */}
        <div className="dashboard-welcome">

          <p>ADMIN PANEL 👋</p>

          <h1>
            Welcome, {user.name || 'Admin'}!
          </h1>

          <span>
            Manage your SmartCampus system from one place.
          </span>

        </div>
       

        {/* Statistics */}
        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <h3>Students</h3>
            <strong>{students.length}</strong>
            <p>Registered students</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📢</div>
            <h3>Notices</h3>
            <strong>{notices.length}</strong>
            <p>Total notices</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <h3>Events</h3>
            <strong>{events.length}</strong>
            <p>Campus events</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <h3>Requests</h3>
            <strong>{requests.length}</strong>
            <p>Student requests</p>
          </div>

        </div>

        {/* Management Section */}
        <section className="admin-section">

          <h2>Campus Management</h2>

          <div className="service-grid">

            <div className="service-card">
              <div className="service-icon">👨‍🎓</div>

              <h3>Manage Students</h3>

              <p>
                View and manage registered students.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById('students-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View Students
              </button>
            </div>

            <div className="service-card">
              <div className="service-icon">📢</div>

              <h3>Manage Notices</h3>

              <p>
                Create and manage college notices.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById('notices-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Manage Notices
              </button>
            </div>

            <div className="service-card">
              <div className="service-icon">📅</div>

              <h3>Manage Events</h3>

              <p>
                Add and manage upcoming campus events.
              </p>

              <button>
                Manage Events
              </button>
            </div>

            <div className="service-card">
              <div className="service-icon">📝</div>

              <h3>Student Requests</h3>

              <p>
                Review student complaints and requests.
              </p>

              <button>
                View Requests
              </button>
            </div>
            <div className="service-card">
              <div className="service-icon">
                📋
              </div>

              <div className="management-card-content">
                <h3>Attendance</h3>

                <p>
                  Manage student attendance records.
                </p>

                <button
                  onClick={() => {
                    document
                      .getElementById('attendance-section')
                      ?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }}
                >
                  Manage Attendance →
                </button>
              </div>
            </div>

            
            <div className="service-card">
                <div className="service-icon">
                  📚
                </div>

                <div className="management-card-content">
                  <h3>Study Material</h3>

                  <p>
                    Upload and manage study materials for students.
                  </p>

                  <button
                    onClick={() => {
                      document
                        .getElementById('study-material-section')
                        ?.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }}
                    >
                      Manage Study Material →
                  </button>
                </div>
              </div>
            <div className="service-card">
              <div className="service-icon">🔔</div>

              <h3>Notifications</h3>

              <p>
                Create and manage campus notifications
                for students.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById('notifications-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Manage Notifications
              </button>
              </div>

              <div className="service-card">
                <div className="service-icon">📊</div>

                <h3>Analytics</h3>

                <p>
                  View campus statistics and management reports.
                </p>

                <button
                  onClick={() =>
                    document
                      .getElementById('analytics-section')
                      ?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    View Analytics
                </button>
              </div>

            

          </div>

        </section>
        
        {/* Notices Section */}
<section
  className="admin-section notices-admin-section"
  id="notices-section"
>
  <div className="notices-header">
    <div>
      <h2>Manage Notices</h2>
      <p>
        Create and publish important college notices.
      </p>
    </div>

    <div className="notice-count">
      📢 College Notices
    </div>
  </div>

  <form
    className="notice-form"
    onSubmit={handleAddNotice}
  >
    <div className="form-group">
      <label>Notice Title</label>

      <input
        type="text"
        placeholder="Enter notice title"
        value={noticeTitle}
        onChange={(e) =>
          setNoticeTitle(e.target.value)
        }
      />
    </div>

    <div className="form-group">
      <label>Category</label>

      <select
        value={noticeCategory}
        onChange={(e) =>
          setNoticeCategory(e.target.value)
        }
      >
        <option value="General">General</option>
        <option value="Exam">Exam</option>
        <option value="Event">Event</option>
        <option value="Important">Important</option>
        <option value="Placement">Placement</option>
      </select>
    </div>

    <div className="form-group">
      <label>Notice Description</label>

      <textarea
        rows="5"
        placeholder="Enter notice details"
        value={noticeDescription}
        onChange={(e) =>
          setNoticeDescription(e.target.value)
        }
      ></textarea>
    </div>

    <button
      type="submit"
      className="add-notice-btn"
    >
      📢 Publish Notice
    </button>

    {noticeMessage && (
      <p className="notice-message">
        {noticeMessage}
      </p>
    )}
  </form>

  <div className="notice-list">
    <h2>Published Notices</h2>

    {loadingNotices ? (
      <p>Loading notices...</p>
    ) : notices.length === 0 ? (
      <p>No notices available.</p>
    ) : (
      notices.map((notice) => (
        <div className="notice-card" key={notice._id}>
          <h4>{notice.title}</h4>
          <p>{notice.description}</p>
          <span>{notice.category}</span>
        </div>
      ))
    )}
  </div>

</section>

        {/* Events Section */}
<section className="admin-section events-admin-section" id="events-section">

  <div className="notices-header">
    <div>
      <h2>Manage Events</h2>
      <p>Create and publish important campus events.</p>
    </div>

    <div className="notice-count">
      📅 Campus Events
    </div>
  </div>

  <form
    className="notice-form"
    onSubmit={async (e) => {
      e.preventDefault()

      try {
        const response = await fetch(
          'https://smart-campus-management-wmbi.onrender.com/api/events',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: eventTitle,
              description: eventDescription,
              date: eventDate,
              venue: eventVenue,
              category: eventCategory
            })
          }
        )

        const data = await response.json()

        if (response.ok) {
          setEventMessage('Event added successfully!')

          setEvents([data.event, ...events])

          setEventTitle('')
          setEventDescription('')
          setEventDate('')
          setEventVenue('')
          setEventCategory('General')
        } else {
          setEventMessage(data.message || 'Unable to add event')
        }
      } catch (error) {
        console.log('Add Event Error:', error)
        setEventMessage('Server error. Please try again.')
      }
    }}
  >

    <div className="form-group">
      <label>Event Title</label>

      <input
        type="text"
        placeholder="Enter event title"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        required
      />
    </div>


    <div className="form-group">
      <label>Category</label>

      <select
        value={eventCategory}
        onChange={(e) => setEventCategory(e.target.value)}
      >
        <option value="General">General</option>
        <option value="Workshop">Workshop</option>
        <option value="Seminar">Seminar</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
        <option value="Placement">Placement</option>
      </select>
    </div>


    <div className="form-group">
      <label>Event Date</label>

      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        required
      />
    </div>


    <div className="form-group">
      <label>Venue</label>

      <input
        type="text"
        placeholder="Enter event venue"
        value={eventVenue}
        onChange={(e) => setEventVenue(e.target.value)}
        required
      />
    </div>


    <div className="form-group">
      <label>Event Description</label>

      <textarea
        rows="5"
        placeholder="Enter event details"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
        required
      ></textarea>
    </div>


    <button
      type="submit"
      className="add-notice-btn"
    >
      📅 Publish Event
    </button>


    {eventMessage && (
      <p className="notice-message">
        {eventMessage}
      </p>
    )}

  </form>


  <div className="notice-list">

    <h2>Published Events</h2>

    {loadingEvents ? (
      <p>Loading events...</p>
    ) : events.length === 0 ? (
      <p>No events available.</p>
    ) : (
      events.map((event) => (
        <div
          className="notice-card"
          key={event._id}
        >
          <h4>{event.title}</h4>

          <p>{event.description}</p>

          <p>
            📅 {new Date(event.date).toLocaleDateString()}
          </p>

          <p>
            📍 {event.venue}
          </p>

          <span>{event.category}</span>
        </div>
      ))
    )}

  </div>

</section>

        {/* Students Section */}
        <section
          className="admin-section students-admin-section"
          id="students-section"
        >

          <div className="students-header">
            <div>
              <h2>Registered Students</h2>
              <p>
                View all students registered in SmartCampus.
              </p>
            </div>

            <div className="student-count">
              👨‍🎓 {students.length} Students
            </div>
          </div>

          {loadingStudents ? (
            <div className="students-loading">
              Loading students...
            </div>
          ) : students.length === 0 ? (
            <div className="students-empty">
              <div>👨‍🎓</div>
              <h3>No Students Found</h3>
              <p>
                No students are currently registered.
              </p>
            </div>
          ) : (
            <div className="students-table-container">

              <table className="students-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Registered On</th>
                  </tr>
                </thead>

                <tbody>

                  {students.map((student, index) => (
                    <tr key={student._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <div className="student-name">
                          <span className="student-avatar">
                            {student.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </span>

                          {student.name}
                        </div>
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        <span className="role-badge">
                          {student.role}
                        </span>
                      </td>

                      <td>
                        {student.createdAt
                          ? new Date(
                              student.createdAt
                            ).toLocaleDateString()
                          : '-'}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* Attendance Section */}
        <section
          className="admin-section attendance-admin-section"
          id="attendance-section"
        >
          <div className="notices-header">
            <div>
              <h2>📋 Attendance Management</h2>

              <p>
                Add and manage student attendance records.
              </p>
            </div>

            <div className="notice-count">
              📊 {attendance.length} Records
            </div>
          </div>

          {/* Add Attendance Form */}
          <div className="notification-form-card">

            <h3>➕ Add Attendance</h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault()

                try {
                  const response = await fetch(
                    'https://smart-campus-management-wmbi.onrender.com/api/attendance',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(attendanceForm)
                    }
                  )

                  const data = await response.json()

                  if (response.ok) {
                    alert('Attendance added successfully! ✅')

                    setAttendance([
                      data.attendance,
                      ...attendance
                    ])

                    setAttendanceForm({
                      studentName: '',
                      studentEmail: '',
                      subject: '',
                      date: '',
                      status: 'Present'
                    })
                  } else {
                    alert(
                      data.message ||
                      'Unable to add attendance'
                    )
                  }
                } catch (error) {
                  console.log(
                    'Add Attendance Error:',
                    error
                  )

                  alert(
                    'Unable to connect to server'
                  )
                }
             }}
            >

            <div className="form-group">
              <label>Student Name</label>

              <input
                type="text"
                placeholder="Enter student name"
                value={attendanceForm.studentName}
                onChange={(e) =>
                  setAttendanceForm({
                    ...attendanceForm,
                    studentName: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Student Email</label>

              <input
                type="email"
                placeholder="Enter student email"
                value={attendanceForm.studentEmail}
                onChange={(e) =>
                  setAttendanceForm({
                    ...attendanceForm,
                    studentEmail: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>

              <input
                type="text"
                placeholder="Enter subject"
                value={attendanceForm.subject}
                onChange={(e) =>
                  setAttendanceForm({
                    ...attendanceForm,
                    subject: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>

              <input
                type="date"
                value={attendanceForm.date}
                onChange={(e) =>
                setAttendanceForm({
                  ...attendanceForm,
                  date: e.target.value
                })
              }
                required
              />
            </div>

            <div className="form-group">
              <label>Attendance Status</label>

              <select
                value={attendanceForm.status}
                onChange={(e) =>
                  setAttendanceForm({
                    ...attendanceForm,
                    status: e.target.value
                  })
                }
              >
                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="add-notice-btn"
            >
              📋 Save Attendance
            </button>

          </form>
        </div>
        {/* Attendance Records */}
        <div className="attendance-records-card">

          <div className="notices-header">
            <div>
              <h3>📋 Attendance Records</h3>
              <p>
                View all student attendance records.
              </p>
            </div>
          </div>

          {attendance.length === 0 ? (
            <div className="empty-state">
              <p>📭 No attendance records found.</p>
            </div>
          ) : (
            <div className="table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id}>

                    <td>{record.studentName}</td>

                    <td>{record.studentEmail}</td>

                    <td>{record.subject}</td>

                    <td>
                      {new Date(
                        record.date
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={
                          record.status === 'Present'
                            ? 'status-present'
                            : 'status-absent'
                          }
                        >
                          {record.status === 'Present'
                            ? '🟢 Present'
                            : '🔴 Absent'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete-attendance-btn"
                        onClick={() =>
                          handleDeleteAttendance(record._id)
                        }
                      >
                        🗑️ Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

    </div>

    </section>

    {/* Study Material Section */}
    <section
      className="admin-section study-material-admin-section"
      id="study-material-section"
    >
      <div className="notices-header">
        <div>
          <h2>📚 Study Material Management</h2>

          <p>
            Upload notes and study materials for students.
          </p>
        </div>

        <div className="notice-count">
          📚 Study Materials
        </div>
      </div>

      {/* Upload Study Material Form */}
      <div className="notification-form-card">

        <h3>➕ Upload Study Material</h3>

        <form onSubmit={handleStudyMaterialUpload}>

          <div className="form-group">
            <label>Material Title</label>

              <input
                type="text"
                placeholder="Enter material title"
                value={studyMaterialForm.title}
                onChange={(e) =>
                  setStudyMaterialForm({
                    ...studyMaterialForm,
                    title: e.target.value
                  })
                }
              />
          </div>

          <div className="form-group">
            <label>Subject</label>

              <input
                type="text"
                placeholder="Enter subject name"
                value={studyMaterialForm.subject}
                onChange={(e) =>
                  setStudyMaterialForm({
                    ...studyMaterialForm,
                    subject: e.target.value
                  })
                }
              />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Enter material description"
              value={studyMaterialForm.description}
              onChange={(e) =>
                setStudyMaterialForm({
                  ...studyMaterialForm,
                  description: e.target.value
                })
              }
            ></textarea>
          </div>

          <div className="form-group">
            <label>Upload File</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={(e) =>
                setStudyMaterialForm({
                  ...studyMaterialForm,
                  file: e.target.files[0]
                })
              }
            />
          </div>

          <button
            type="submit"
            className="add-notice-btn"
          >
            📤 Upload Study Material
          </button>

          {studyMaterialMessage && (
            <p className="notice-message">
              {studyMaterialMessage}
            </p>
          )}

        </form>

      </div>

      {/* Study Material List */}
      <div className="attendance-records-card">

        <div className="notices-header">
          <div>
            <h3>📚 Uploaded Study Materials</h3>

            <p>
              View and manage uploaded study materials.
            </p>
          </div>
        </div>

        {studyMaterials.length === 0 ? (
          <div className="empty-state">
          <p>
            📭 No study materials uploaded yet.
          </p>
        </div>
      ) : (
        <div className="study-material-list">
          {studyMaterials.map((material) => {
            const fileUrl = `https://smart-campus-management-wmbi.onrender.com/${material.filePath.replace(/\\/g, '/')}`

            return (
              <div
                className="study-material-card"
                key={material._id}
              >
                <div className="study-material-icon">
                  📄
                </div>

                <div className="study-material-info">
                  <h3>{material.title}</h3>

                  <p>
                    <strong>Subject:</strong>{' '}
                    {material.subject}
                  </p>

                  {material.description && (
                    <p>
                      {material.description}
                    </p>
                  )}

                  <p className="study-material-file">
                    📎 {material.fileName}
                  </p>
                </div>

                <div className="study-material-actions">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="view-material-btn"
                  >
                    👁️ View
                  </a>

                  <a
                    href={fileUrl}
                    download
                    className="download-material-btn"
                  > 
                    ⬇️ Download
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}

       </div>

    </section>

        {/* Requests Section */}
        <section
          className="admin-section requests-admin-section"
          id="requests-section"
        >
        <div className="notices-header">
        <div>
          <h2>Student Requests</h2>
          <p>
            Review and manage student complaints and requests.
          </p>
        </div>

        <div className="notice-count">
          📝 {requests.length} Requests
        </div>
      </div>

      {loadingRequests ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <div className="students-empty">
          <div>📝</div>
          <h3>No Requests Found</h3>
          <p>
            Student requests will appear here.
          </p>
        </div>
      ) : (
        <div className="requests-admin-list">

          {requests.map((request) => (
            <div
              className="request-admin-card"
              key={request._id}
            >

            <div className="request-admin-header">
              <div>
                <h3>{request.requestType}</h3>

                <p>
                  👤 {request.studentName}
                </p>

                <p>
                  📧 {request.studentEmail}
                </p>
              </div>

              <span
                className={`request-status-badge status-${request.status
                  .toLowerCase()
                  .replace(' ', '-')}`}
                >
                  {request.status}
                </span>
            </div>

            <div className="request-admin-description">
              <strong>Description</strong>

              <p>
                {request.description}
              </p>
            </div>

            <div className="request-admin-footer">

              <small>
                📅{' '}
                {request.createdAt
                  ? new Date(
                      request.createdAt
                    ).toLocaleDateString()
                  : '-'}
              </small>

              <select
                value={request.status}
                onChange={async (e) => {
                  const newStatus = e.target.value

                  try {
                    const response = await fetch(
                      `https://smart-campus-management-wmbi.onrender.com/api/requests/${request._id}/status`,  
                      {  
                        method: 'PUT',  
                        headers: {  
                          'Content-Type': 'application/json'  
                        },  
                        body: JSON.stringify({  
                          status: newStatus  
                        })  
                      }  
                    )  
  
                    const data = await response.json()  
  
                    if (response.ok) {  
                      setRequests(  
                        requests.map((item) =>  
                          item._id === request._id  
                            ? data.request  
                            : item  
                          )  
                        )  
                      } else {  
                        alert(  
                          data.message ||  
                          'Unable to update status'  
                        )  
                      }  
                    } catch (error) {  
                      console.log(  
                        'Update Request Error:',  
                        error  
                      )  
  
                      alert(  
                        'Unable to connect to server'  
                     )  
                    }  
                 }}  
                >  
                  <option value="Pending">  
                    Pending  
                  </option>  
  
                  <option value="In Progress">  
                    In Progress  
                  </option>  
  
                  <option value="Resolved">  
                    Resolved  
                  </option>  
  
                  <option value="Rejected">  
                    Rejected  
                  </option>  
                </select>  
  
              </div>  
  
            </div>  
        ))}  
  
      </div>  
  )}  
  
</section> 
 
        {/* Requests Section */} 
        <section 
          className="admin-section requests-admin-section" 
          id="requests-section" 
        > 
 
          
 
        </section> 
 
 
        {/* Notifications Section */} 
        <section 
          className="admin-section notifications-admin-section" 
          id="notifications-section" 
        > 
          <div className="notices-header"> 
            <div> 
              <h2>Campus Notifications</h2> 
 
              <p> 
                Create and manage important notifications for students. 
              </p> 
            </div> 
 
            <div className="notice-count"> 
              🔔 {notifications.length} Notifications 
            </div> 
          </div> 
 
          {/* Create Notification */} 
          <div className="notification-form-card"> 
 
            <h3>Create New Notification</h3> 
 
            <form onSubmit={handleAddNotification}> 
 
              <input 
                type="text" 
                placeholder="Notification title" 
                value={notificationTitle} 
                onChange={(e) => 
                  setNotificationTitle(e.target.value) 
                } 
              /> 
 
              <textarea 
                placeholder="Write notification message..." 
                value={notificationMessage} 
                onChange={(e) => 
                  setNotificationMessage(e.target.value) 
                } 
              > 
 
              </textarea> 
 
              <select 
                value={notificationType} 
                onChange={(e) => 
                  setNotificationType(e.target.value) 
                } 
              > 
                <option value="General">General</option> 
                <option value="Important">Important</option> 
                <option value="Event">Event</option> 
                <option value="Exam">Exam</option> 
                <option value="Holiday">Holiday</option> 
              </select> 
 
              <button type="submit"> 
                🔔 Create Notification 
              </button> 
 
            </form> 
 
            {notificationStatus && ( 
              <p className="notification-status"> 
                {notificationStatus} 
              </p> 
            )} 
 
          </div> 
 
          {/* Existing Notifications */} 
          <div className="notifications-list"> 
 
            <h3>Existing Notifications</h3> 
 
            {loadingNotifications ? ( 
              <p>Loading notifications...</p> 
            ) : notifications.length === 0 ? ( 
              <div className="students-empty"> 
                <div>🔔</div> 
 
                <h3>No Notifications Found</h3> 
 
                <p> 
                  Create a notification to display it here. 
                </p> 
              </div> 
            ) : ( 
              notifications.map((notification) => ( 
                <div 
                  className="notification-card" 
                  key={notification._id} 
                > 
                  <div> 
 
                    <span className="notification-type"> 
                      {notification.type} 
                    </span> 
 
                    <h4> 
                      {notification.title} 
                    </h4> 
 
                    <p> 
                      {notification.message} 
                    </p> 
 
                    <small> 
                      📅{' '} 
                      {new Date( 
                        notification.createdAt || 
                        notification.date 
                      ).toLocaleDateString()} 
                    </small> 
 
                    </div> 
 
                    <button 
                      className="delete-notification-btn" 
                      onClick={() => 
                        handleDeleteNotification( 
                          notification._id 
                        ) 
                      } 
                    > 
                      🗑️ Delete 
                    </button> 
 
                  </div> 
                )) 
              )} 
 
            </div> 
 
        </section>

        {/* Analytics Section */}
        <section
          className="admin-section analytics-admin-section"
          id="analytics-section"
        >
          <div className="notices-header">
            <div>
              <h2>📊 Campus Analytics</h2>

              <p>
                View statistics and management reports of your SmartCampus.
              </p>
            </div>

            <div className="notice-count">
              📈 Overview
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="analytics-grid">

            <div className="analytics-card">
              <div className="analytics-icon">
                👨‍🎓
              </div>

              <div>
                <h3>Students</h3>
                <strong>{students.length}</strong>
                <p>Registered students</p>
              </div>
            </div>

              <div className="analytics-card">
                <div className="analytics-icon">
                  📢
                </div>

                <div>
                  <h3>Notices</h3>
                  <strong>{notices.length}</strong>
                  <p>Published notices</p>
                </div>
              </div>

              <div className="analytics-card">
                <div className="analytics-icon">
                  📅
                </div>

                <div>
                  <h3>Events</h3>
                  <strong>{events.length}</strong>
                  <p>Campus events</p>
                </div>
              </div>

              <div className="analytics-card">
                <div className="analytics-icon">
                  📝
                </div>

                <div>
                  <h3>Requests</h3>
                  <strong>{requests.length}</strong>
                  <p>Student requests</p>
                </div>
              </div>

            </div>



        </section>
        
         

 
 
      </main> 
 
    </div> 
 
 
  ) 
} 
    
 
  
export default AdminDashboard 