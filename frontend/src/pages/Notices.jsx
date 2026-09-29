import { Link } from 'react-router-dom'

function Notices() {
  const notices = [
    {
      title: 'Semester Examination Notice',
      date: '04 September 2026',
      description: 'Students are requested to check the examination schedule.'
    },
    {
      title: 'College Event Announcement',
      date: '06 September 2026',
      description: 'Annual college events and activities will be conducted soon.'
    },
    {
      title: 'Important Student Update',
      date: '08 September 2026',
      description: 'Please check the latest instructions from the administration.'
    }
  ]

  return (
    <div className="notices-page">

      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          🎓 SmartCampus
        </div>

        <div className="dashboard-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/">Home</Link>
        </div>
      </nav>

      <main className="notices-content">

        <div className="notices-header">
          <p>SMART NOTICES</p>
          <h1>Campus Notices 📢</h1>
          <span>Stay updated with the latest college announcements.</span>
        </div>

        <div className="notices-list">

          {notices.map((notice, index) => (
            <div className="notice-card" key={index}>

              <div className="notice-icon">
                📢
              </div>

              <div className="notice-info">
                <h2>{notice.title}</h2>

                <small>
                  📅 {notice.date}
                </small>

                <p>
                  {notice.description}
                </p>
              </div>

              <span className="notice-badge">
                New
              </span>

            </div>
          ))}

        </div>

      </main>

    </div>
  )
}

export default Notices