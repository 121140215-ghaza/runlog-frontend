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
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: 'auto', marginTop: 100 }}>
      <h2>Login RUNLOG</h2>
      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit" disabled={loading} style={{ padding: 10, width: '100%', cursor: 'pointer' }}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}
