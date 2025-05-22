import { useEffect, useState } from 'react'
import API from '../api'
import Input from '../components/Input'

export default function Dashboard() {
  const [logs, setLogs] = useState([])
  const [form, setForm] = useState({ date: '', distance: '', duration: '', note: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchLogs()
  }, [])

  async function fetchLogs() {
    try {
      const res = await API.get('/cek/runlogs')
      setLogs(res.data)
    } catch {
      alert('Gagal mengambil data, silakan login ulang')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/create/runlogs', {
        date: form.date,
        distance: parseFloat(form.distance),
        duration: parseInt(form.duration),
        note: form.note || null
      })
      setForm({ date: '', distance: '', duration: '', note: '' })
      fetchLogs()
    } catch {
      alert('Gagal tambah log')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      maxWidth: 640,
      margin: '40px auto',
      padding: 24,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9f9fb',
      borderRadius: 12,
      boxShadow: '0 4px 20px rgb(0 0 0 / 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#5a4a8f', marginBottom: 24 }}>
        dashboard runlog
      </h2>

      <form onSubmit={handleSubmit} style={{
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        boxShadow: '0 2px 10px rgb(0 0 0 / 0.05)'
      }}>
        <Input
          label="Tanggal (YYYY-MM-DD)"
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <Input
          label="Jarak (km)"
          type="number"
          step="0.1"
          value={form.distance}
          onChange={e => setForm({ ...form, distance: e.target.value })}
          required
        />
        <Input
          label="Durasi (menit)"
          type="number"
          value={form.duration}
          onChange={e => setForm({ ...form, duration: e.target.value })}
          required
        />
        <Input
          label="Catatan"
          type="text"
          value={form.note}
          onChange={e => setForm({ ...form, note: e.target.value })}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 14,
            backgroundColor: '#764ba2',
            border: 'none',
            borderRadius: 8,
            color: 'white',
            fontWeight: '700',
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => {
            if (!loading) e.currentTarget.style.backgroundColor = '#667eea'
          }}
          onMouseLeave={e => {
            if (!loading) e.currentTarget.style.backgroundColor = '#764ba2'
          }}
        >
          {loading ? 'Loading...' : 'Tambah Log'}
        </button>
      </form>

      <h3 style={{ color: '#5a4a8f', marginBottom: 12, borderBottom: '2px solid #764ba2', paddingBottom: 8 }}>
       Daftar Log Lari
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {logs.length === 0 && <li style={{ fontStyle: 'italic', color: '#777' }}>tidak ada data</li>}
        {logs.map(log => (
          <li
            key={log.id}
            style={{
              backgroundColor: 'white',
              padding: '12px 16px',
              marginBottom: 10,
              borderRadius: 8,
              boxShadow: '0 2px 6px rgb(0 0 0 / 0.07)',
              fontSize: 15,
              color: '#333'
            }}
          >
            <strong>{log.date}</strong>: {log.distance} km, {log.duration} menit, Catatan: {log.note || '-'}
          </li>
        ))}
      </ul>
    </div>
  )
}
