import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([])
  const [loadingNotifications, setLoadingNotifications] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  const user = JSON.parse(localStorage.getItem('smartCampusUser'))

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          'https://smart-campus-management-wmbi.onrender.com/api/notifications'
        )

        const data = await response.json()

        if (response.ok) {
          setNotifications(data)
          setUnreadCount(data.length)
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

    const markNotificationAsRead = async (notificationId) => {
      console.log('Notification clicked:', notificationId)
    try {
      const response = await fetch(
        `https://smart-campus-management-wmbi.onrender.com/api/notifications/${notificationId}/read`,
        {
          method: 'PUT'
        }
      )
      console.log('Read API Status:', response.status)

      const result = await response.json()
      console.log('Read API Result:', result)

      if (response.ok) {
        setNotifications((currentNotifications) =>
          currentNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, isRead: true }
              : notification
          )
        )

        setUnreadCount((currentCount) =>
          Math.max(currentCount - 1, 0)
        )
      }
    } catch (error) {
      console.log(
        'Mark Notification Read Error:',
        error
      )
    }
  }

  if (!user) {
    navigate('/login')
    return null
  }
  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          🎓 SmartCampus
        </div>

        <div className="dashboard-nav-links">

          <Link to="/">
            📅Home
          </Link>

          <Link to="/dashboard">
            🏠 Dashboard
          </Link>

          <Link to="/notices">
            📢 Notices
          </Link>

          <Link to="/events">
            📅 Events
          </Link>

          <Link to="/requests">
            📝 Requests
          </Link>

          <Link to="/ai-assistant">
            🤖 AI Assistant
          </Link>

          <Link to="/admin-dashboard">
            🛠️ Admin Dashboard
          </Link>
          <Link
            to="/dashboard"
            className="notification-nav-link"
          >
            🔔 Notifications

            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount}
              </span>
            )}
          </Link>
  
          

          <button
            onClick={() => {
              localStorage.removeItem('smartCampusUser')
              localStorage.removeItem('smartCampusToken')
              window.location.href = '/login'
            }}
          >
            🚪 Logout
          </button>

        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="dashboard-content">

        <div className="dashboard-welcome">
          <p>WELCOME BACK 👋</p>

          <h1>
            Hello, {user?.name || 'Student'}!
          </h1>

          <p>
            Welcome to your SmartCampus Dashboard.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="stat-icon">📢</div>
            <div>
              <h3>Notices</h3>
              <p>Latest campus updates</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">📅</div>
            <div>
              <h3>Events</h3>
              <p>Upcoming campus events</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">📝</div>
            <div>
              <h3>My Requests</h3>
              <p>Track your requests</p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">🤖</div>
            <div>
              <h3>AI Assistant</h3>
              <p>Get instant help</p>
            </div>
          </div>

        </div>

        {/* Notifications */}
        <section className="dashboard-section">

          <div className="notifications-header">
            <div>
              <h2>🔔 Notifications</h2>
              <p>Latest updates from SmartCampus</p>
            </div>

            <div className="notification-count">
              {notifications.length} Updates
            </div>
          </div>

          {loadingNotifications ? (
            <div className="notification-empty">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="notification-empty">
              No new notifications 🔔
            </div>
          ) : (
            <div className="notifications-list">

              {notifications.map((notification) => (
                <div
                  className={`notification-card ${
                    !notification.isRead ? 'unread-notification' : ''
                  }`}
                  key={notification._id}
                  onClick={() =>
                    !notification.isRead &&
                    markNotificationAsRead(notification._id)
                  }
                >

                  <div className="notification-icon">
                    🔔
                  </div>

                  <div className="notification-content">

                    <div className="notification-title-row">
                      <h3>{notification.title}</h3>

                      <span className="notification-type">
                        {notification.type || 'General'}
                      </span>
                    </div>

                    <p>{notification.message}</p>

                    <small>
                      {new Date(
                        notification.date || notification.createdAt
                      ).toLocaleDateString('en-IN')}
                    </small>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

        {/* Features */}
        <section className="dashboard-section">

          <h2>Campus Services</h2>

          <div className="dashboard-grid">

            <div className="service-card">
              <span>📢</span>
              <h3>Smart Notices</h3>
              <p>View important college announcements.</p>
                <Link to="/notices">
                    <button>View Notices</button>
                </Link>
            </div>

            <div className="service-card">
              <span>📅</span>
              <h3>Campus Events</h3>
              <p>Explore upcoming college events.</p>
                <Link to="/events">
                    <button>View Events</button>
                </Link>
            </div>

            <div className="service-card">
              <span>📝</span>
              <h3>Complaints & Requests</h3>
              <p>Submit and track your requests.</p>
                <Link to="/requests">
                    <button>Submit Request</button>
                </Link>
            </div>

            <div className="service-card">
              <span>🤖</span>
              <h3>AI Campus Assistant</h3>
              <p>Ask questions and get campus information.</p>
                <Link to="/ai-assistant">
                    <button>Ask AI</button>
                </Link>
            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Dashboard