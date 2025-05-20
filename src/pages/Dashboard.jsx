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
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Dashboard RunLog</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
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
        <button type="submit" disabled={loading} style={{ padding: 10, cursor: 'pointer' }}>
          {loading ? 'Loading...' : 'Tambah Log'}
        </button>
      </form>

      <h3>Daftar Log Lari</h3>
      <ul>
        {logs.length === 0 && <li>Tidak ada data</li>}
        {logs.map(log => (
          <li key={log.id}>
            <strong>{log.date}</strong>: {log.distance} km, {log.duration} menit, Catatan: {log.note || '-'}
          </li>
        ))}
      </ul>
    </div>
  )
}
