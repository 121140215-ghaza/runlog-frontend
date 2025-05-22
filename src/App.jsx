import { useNavigate, BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Goals from './pages/Goals'
import Stats from './pages/Stats'
import TestAPI from './pages/TestAPI'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (!token) return null

  return (
    <nav style={{
      padding: '12px 24px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      marginBottom: 30,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 8px rgb(0 0 0 / 0.1)',
      borderRadius: '0 0 10px 10px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div>
        {['Dashboard', 'Goals', 'stats'].map((route, i) => (
          <Link
            key={route}
            to={`/${route}`}
            style={{
              marginRight: i !== 3 ? 20 : 0,
              color: 'white',
              fontWeight: '600',
              textDecoration: 'none',
              textTransform: 'capitalize',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffd6e8'}
            onMouseLeave={e => e.currentTarget.style.color = 'white'}
          >
            {route === 'goals' ? 'Target Bulanan' : route.charAt(0).toUpperCase() + route.slice(1)}
          </Link>
        ))}
      </div>
      <button
        onClick={handleLogout}
        style={{
          cursor: 'pointer',
          backgroundColor: '#ff6f91',
          border: 'none',
          borderRadius: 8,
          color: 'white',
          padding: '8px 16px',
          fontWeight: '600',
          boxShadow: '0 2px 6px rgb(0 0 0 / 0.15)',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ff3b7f'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ff6f91'}
      >
        Logout
      </button>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
          <Route path="/goals" element={
            <PrivateRoute><Goals /></PrivateRoute>
          } />
          <Route path="/stats" element={
            <PrivateRoute><Stats /></PrivateRoute>
          } />
          <Route path="/testapi" element={
            <PrivateRoute><TestAPI /></PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
