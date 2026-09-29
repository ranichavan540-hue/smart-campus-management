import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Requests() {
  const [requestType, setRequestType] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const user = JSON.parse(
    localStorage.getItem('smartCampusUser') || '{}'
  )

  // Fetch student's requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/requests'
        )

        const data = await response.json()

        if (response.ok) {
          const myRequests = data.filter(
            (request) =>
              request.studentEmail === user.email
          )

          setRequests(myRequests)
        }
      } catch (error) {
        console.log('Requests Fetch Error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user.email) {
      fetchRequests()
    } else {
      setLoading(false)
    }
  }, [user.email])


  // Submit request
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!requestType || !description) {
      setMessage('Please fill all fields.')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/requests',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            studentName: user.name,
            studentEmail: user.email,
            requestType,
            description
          })
        }
      )

      const data = await response.json()

      if (response.ok) {
        setMessage('Request submitted successfully! ✅')

        setRequests([data.request, ...requests])

        setRequestType('')
        setDescription('')
      } else {
        setMessage(
          data.message || 'Unable to submit request'
        )
      }
    } catch (error) {
      console.log('Submit Request Error:', error)
      setMessage('Unable to connect to server')
    }
  }


  return (
    <div className="requests-page">

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          🎓 SmartCampus
        </div>

        <div className="dashboard-nav-links">

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

          <Link to="/">
            Home
          </Link>

        </div>

      </nav>


      <main className="requests-content">

        <div className="requests-header">

          <p>STUDENT SERVICES</p>

          <h1>
            Complaints & Requests 📝
          </h1>

          <span>
            Submit your complaint or request and track its status.
          </span>

        </div>


        <div className="request-container">

          {/* Submit Request */}

          <div className="request-form-card">

            <h2>Submit New Request</h2>

            <form onSubmit={handleSubmit}>

              <label>Request Type</label>

              <select
                value={requestType}
                onChange={(e) =>
                  setRequestType(e.target.value)
                }
              >

                <option value="">
                  Select request type
                </option>

                <option value="Complaint">
                  Complaint
                </option>

                <option value="Leave Request">
                  Leave Request
                </option>

                <option value="Certificate Request">
                  Certificate Request
                </option>

                <option value="Technical Issue">
                  Technical Issue
                </option>

                <option value="Other">
                  Other
                </option>

              </select>


              <label>Description</label>

              <textarea
                placeholder="Describe your complaint or request..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              ></textarea>


              <button type="submit">
                Submit Request
              </button>

            </form>


            {message && (
              <p className="request-message">
                {message}
              </p>
            )}

          </div>


          {/* Request Status */}

          <div className="request-status-card">

            <h2>Request Status</h2>

            {loading ? (

              <p>Loading requests...</p>

            ) : requests.length === 0 ? (

              <div className="status-item">

                <span>📋</span>

                <div>
                  <h3>No Active Requests</h3>

                  <p>
                    Your submitted requests will appear here.
                  </p>
                </div>

              </div>

            ) : (

              requests.map((request) => (

                <div
                  className="status-item"
                  key={request._id}
                >

                  <span>📋</span>

                  <div>

                    <h3>
                      {request.requestType}
                    </h3>

                    <p>
                      {request.description}
                    </p>

                    <p>
                      Status:{' '}
                      <strong>
                        {request.status}
                      </strong>
                    </p>

                    <small>
                      {new Date(
                        request.createdAt
                      ).toLocaleDateString()}
                    </small>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </main>

    </div>
  )
}

export default Requests