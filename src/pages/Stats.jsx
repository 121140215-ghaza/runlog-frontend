import { useEffect, useState } from 'react'
import API from '../api'

function formatNumber(num) {
  if (num == null) return '-'
  return Number(num).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

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

  if (loading) return (
    <p style={{
      textAlign: 'center',
      marginTop: 60,
      fontSize: 18,
      color: '#764ba2',
      fontWeight: '600',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      animation: 'pulse 1.5s infinite alternate'
    }}>
      Loading statistik...
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </p>
  )
  if (!stats) return <p style={{ textAlign: 'center', marginTop: 60, color: '#999' }}>Tidak ada data statistik</p>

  return (
    <div style={{
      maxWidth: 420,
      margin: '40px auto',
      padding: 24,
      backgroundColor: '#f5f4fa',
      borderRadius: 12,
      boxShadow: '0 4px 20px rgb(0 0 0 / 0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#3a2e5b'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#5a4a8f' }}>statistik lari</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        fontSize: 16,
        lineHeight: 1.5
      }}>
        <div><strong>Total Jarak</strong></div>
        <div style={{ textAlign: 'right' }}>{formatNumber(stats.total_distance)} km</div>

        <div><strong>Total Durasi</strong></div>
        <div style={{ textAlign: 'right' }}>{formatNumber(stats.total_duration)} menit</div>

        <div><strong>Rata-rata Jarak per Lari</strong></div>
        <div style={{ textAlign: 'right' }}>{formatNumber(stats.avg_distance)} km</div>

        <div><strong>Rata-rata Durasi per Lari</strong></div>
        <div style={{ textAlign: 'right' }}>{formatNumber(stats.avg_duration)} menit</div>
      </div>
    </div>
  )
}
