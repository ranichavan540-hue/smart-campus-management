import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    try {
      const response = await fetch('https://smart-campus-management-wmbi.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Registration successful!')

        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else {
        setMessage(data.message || 'Registration failed')
      }

    } catch (error) {
      console.log(error)
      setMessage('Unable to connect to server')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>Create Account</h2>
        <p>Join SmartCampus Management</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <p>
          Already have an account?{' '}
          <button
              type="button"
              className="login-link"
              onClick={() => navigate('/login')}
          >
              Login
          </button>
        </p>

      </div>
    </div>
  )
}

export default Register