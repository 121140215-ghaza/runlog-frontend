import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import Input from '../components/Input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      console.log('Kirim request login ke:', API.defaults.baseURL + '/login')
      const res = await API.post('/login', { email, password })
      console.log('Response dari backend:', res)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error saat login:', error.response?.data || error.message)
      alert('Login gagal, coba cek email dan password')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        maxWidth: 360, 
        margin: '100px auto', 
        padding: 24,
        borderRadius: 12,
        boxShadow: '0 4px 15px rgb(0 0 0 / 0.1)',
        backgroundColor: 'white',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}
    >
      <h2 style={{textAlign: 'center', color: '#764ba2'}}>LOGIN RUNLOG</h2>
      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button 
        type="submit" 
        disabled={loading} 
        style={{
          padding: 12,
          width: '100%',
          cursor: loading ? 'not-allowed' : 'pointer',
          borderRadius: 8,
          border: 'none',
          backgroundColor: '#764ba2',
          color: 'white',
          fontWeight: '600',
          fontSize: 16,
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={e => {
          if (!loading) e.currentTarget.style.backgroundColor = '#667eea'
        }}
        onMouseLeave={e => {
          if (!loading) e.currentTarget.style.backgroundColor = '#764ba2'
        }}
      >
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}
