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

  if (!token) {
    // Kalau gak ada token, gak tampil Navbar sama sekali
    return null
  }

  return (
    <nav style={{ padding: 10, background: '#eee', marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
        <Link to="/goals" style={{ marginRight: 10 }}>Target Bulanan</Link>
        <Link to="/stats" style={{ marginRight: 10 }}>Statistik</Link>
        <Link to="/testapi">Test API</Link>
      </div>

      <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
        Logout
      </button>
    </nav>
  )
}


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

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
    </BrowserRouter>
  )
}
