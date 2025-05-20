import { useEffect, useState } from 'react'
import API from '../api'

export default function Stats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    setLoading(true)
    try {
      const res = await API.get('/stats')
      setStats(res.data)
    } catch {
      alert('Gagal mengambil data statistik')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading statistik...</p>
  if (!stats) return <p>Tidak ada data statistik</p>

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 40 }}>
      <h2>Statistik Lari</h2>
      <ul>
        <li>Total Jarak: {stats.total_distance} km</li>
        <li>Total Durasi: {stats.total_duration} menit</li>
        <li>Rata-rata Jarak per Lari: {stats.avg_distance} km</li>
        <li>Rata-rata Durasi per Lari: {stats.avg_duration} menit</li>
      </ul>
    </div>
  )
}
