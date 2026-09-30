import { useState } from 'react'
import { Link } from 'react-router-dom'

function AIAssistant() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAsk = async (e) => {
    e.preventDefault()

    if (!question.trim() || loading) {
      return
    }

    const userQuestion = question.trim()

    // Add student message
    setMessages((prev) => [
      ...prev,
      {
        type: 'user',
        text: userQuestion
      }
    ])

    setQuestion('')
    setLoading(true)

    try {
      const response = await fetch('https://smart-campus-management-wmbi.onrender.com/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: userQuestion,
          history: messages
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'ai',
            text: data.answer
          }
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'ai',
            text: data.message || 'Something went wrong.'
          }
        ])
      }
    } catch (error) {
      console.log(error)

      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          text: 'Unable to connect to AI server.'
        }
      ])
    }

    setLoading(false)
  }

  const clearChat = () => {
    setMessages([])
  }

  const askSuggestion = (text) => {
    setQuestion(text)
  }

  return (
    <div className="ai-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          🎓 SmartCampus
        </div>

        <div className="dashboard-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/notices">Notices</Link>
          <Link to="/events">Events</Link>
          <Link to="/requests">Requests</Link>
          <Link to="/">Home</Link>
        </div>

      </nav>

      {/* Main Content */}
      <main className="ai-content">

        {/* Header */}
        <div className="ai-header">

          <div className="ai-big-icon">
            🤖
          </div>

          <p>SMART CAMPUS AI</p>

          <h1>
            AI Campus Assistant
          </h1>

          <span>
            Ask questions and get quick assistance about your campus.
          </span>

        </div>

        {/* Chat Card */}
        <div className="ai-chat-card">

          {/* Welcome */}
          {messages.length === 0 && (
            <div className="ai-welcome">

              <div className="ai-avatar">
                🤖
              </div>

              <div>
                <h3>
                  SmartCampus Assistant
                </h3>

                <p>
                  Hello! How can I help you today?
                </p>
              </div>

            </div>
          )}

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="suggestion-box">

              <p>
                Try asking:
              </p>

              <button
                onClick={() =>
                  askSuggestion(
                    'What are the upcoming college events?'
                  )
                }
              >
                📅 Upcoming events?
              </button>

              <button
                onClick={() =>
                  askSuggestion(
                    'What are the latest college notices?'
                  )
                }
              >
                📢 Latest notices?
              </button>

              <button
                onClick={() =>
                  askSuggestion(
                    'How can I submit a complaint?'
                  )
                }
              >
                📝 Submit a complaint?
              </button>

            </div>
          )}

          {/* Messages */}
          <div className="ai-messages">

            {messages.map((message, index) => (

              <div
                key={index}
                className={
                  message.type === 'user'
                    ? 'ai-message user-message'
                    : 'ai-message bot-message'
                }
              >

                <div className="ai-avatar">
                  {message.type === 'user' ? '👤' : '🤖'}
                </div>

                <div className="message-content">

                  <strong>
                    {message.type === 'user'
                      ? 'You'
                      : 'SmartCampus AI'}
                  </strong>

                  <p>
                    {message.text}
                  </p>

                </div>

              </div>

            ))}

            {/* Loading */}
            {loading && (
              <div className="ai-message bot-message">

                <div className="ai-avatar">
                  🤖
                </div>

                <div className="message-content">

                  <strong>
                    SmartCampus AI
                  </strong>

                  <p>
                    Thinking... 🤔
                  </p>

                </div>

              </div>
            )}

          </div>

          {/* Clear Chat */}
          {messages.length > 0 && !loading && (
            <button
              className="clear-chat-btn"
              onClick={clearChat}
            >
              🗑️ Clear Chat
            </button>
          )}

          {/* Input */}
          <form
            className="ai-input-area"
            onSubmit={handleAsk}
          >

            <input
              type="text"
              placeholder="Ask something about SmartCampus..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Thinking...' : 'Ask AI 🚀'}
            </button>

          </form>

        </div>

      </main>

    </div>
  )
}

export default AIAssistant