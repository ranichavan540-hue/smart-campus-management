import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Notices from './pages/Notices'
import Events from './pages/Events'
import Requests from './pages/Requests'
import AIAssistant from './pages/AIAssistant'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function Home() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🎓 SmartCampus
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section" id="home">

        <div className="hero-content">

          <p className="welcome">
            WELCOME TO SMART CAMPUS
          </p>

          <h1>
            AI-Powered
            <span> Smart Campus </span>
            Management System
          </h1>

          <p className="hero-text">
            A smarter way to manage campus activities, student services,
            notices, complaints, events and much more — all in one platform.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              <button className="primary-btn">
                Get Started →
              </button>
            </Link>

            <a href="#features">
              <button className="secondary-btn">
                Explore Features
              </button>
            </a>

          </div>

        </div>

        <div className="hero-card">

          <div className="ai-icon">🤖</div>

          <h2>Smart Campus Assistant</h2>

          <p>
            Your AI-powered assistant for quick campus information and support.
          </p>

          <div className="mini-card">
            📢 Latest Notices
            <span>View →</span>
          </div>

          <div className="mini-card">
            📅 Upcoming Events
            <span>View →</span>
          </div>

          <div className="mini-card">
            📝 My Requests
            <span>Track →</span>
          </div>

        </div>

      </section>

      {/* Features */}
      <section className="features-section" id="features">

        <p className="section-title">
          OUR FEATURES
        </p>

        <h2>
          Everything Your Campus Needs
        </h2>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Campus Assistant</h3>
            <p>
              Get instant answers to campus-related questions using AI.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📢</div>
            <h3>Smart Notices</h3>
            <p>
              Stay updated with important college announcements and notices.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Complaints & Requests</h3>
            <p>
              Submit complaints and track their status easily.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Campus Events</h3>
            <p>
              Discover upcoming college events and activities.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Notifications</h3>
            <p>
              Receive important updates and notifications in one place.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>
              View useful campus statistics and reports through dashboards.
            </p>
          </div>

        </div>

      </section>

      {/* About */}
      <section className="about-section" id="about">

        <div>

          <p className="section-title">
            ABOUT THE SYSTEM
          </p>

          <h2>
            Making Campus Life Smarter
          </h2>

          <p>
            SmartCampus brings students, faculty and administrators together
            on one digital platform. With AI-powered assistance and modern
            campus management tools, everyday college activities become
            faster, easier and more organized.
          </p>

        </div>

        <div className="stats">

          <div>
            <strong>10+</strong>
            <span>Smart Features</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>AI Assistance</span>
          </div>

          <div>
            <strong>1</strong>
            <span>Unified Platform</span>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer>

        <h3>🎓 SmartCampus</h3>

        <p>
          AI-Powered Smart Campus Management System
        </p>

        <p>
          © 2026 SmartCampus. All Rights Reserved.
        </p>

      </footer>

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/notices" element={<Notices />} />

        <Route path="/events" element={<Events />} />

        <Route path="/requests" element={<Requests />} />

        <Route path="/ai-assistant" element={<AIAssistant />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App