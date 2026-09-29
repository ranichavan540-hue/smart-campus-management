import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Events() {

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const response = await fetch(
          'http://localhost:5000/api/events'
        )

        const data = await response.json()

        if (response.ok) {
          setEvents(data)
        }

      } catch (error) {

        console.log('Events Fetch Error:', error)

      } finally {

        setLoading(false)

      }

    }

    fetchEvents()

  }, [])


  return (
    <div className="events-page">

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          🎓 SmartCampus
        </div>

        <div className="dashboard-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/notices">Notices</Link>
          <Link to="/">Home</Link>
        </div>

      </nav>


      <main className="events-content">

        <div className="events-header">

          <p>CAMPUS EVENTS</p>

          <h1>Upcoming Events 📅</h1>

          <span>
            Discover upcoming college events, workshops and activities.
          </span>

        </div>


        {loading ? (

          <p>Loading events...</p>

        ) : events.length === 0 ? (

          <p>No upcoming events available.</p>

        ) : (

          <div className="events-grid">

            {events.map((event) => (

              <div
                className="event-card"
                key={event._id}
              >

                <div className="event-icon">
                  📅
                </div>

                <h2>
                  {event.title}
                </h2>


                <div className="event-detail">
                  📅 {new Date(event.date).toLocaleDateString()}
                </div>


                <div className="event-detail">
                  📍 {event.venue}
                </div>


                <div className="event-detail">
                  🏷️ {event.category}
                </div>


                <p>
                  {event.description}
                </p>


                <button>
                  View Details
                </button>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  )
}

export default Events