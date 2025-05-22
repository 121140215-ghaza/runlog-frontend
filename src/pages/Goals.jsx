import { useEffect, useState } from 'react'
import API from '../api'

export default function Goals() {
  const [goals, setGoals] = useState([])
  const [month, setMonth] = useState('')
  const [targetDistance, setTargetDistance] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGoals()
  }, [])

  async function fetchGoals() {
    setLoading(true)
    try {
      const res = await API.get('/goals')
      let data = res.data || []
      data.sort((a, b) => a.month.localeCompare(b.month))
      setGoals(data)
    } catch (error) {
      alert('Gagal ambil data target bulanan')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddGoal(e) {
    e.preventDefault()
    if (!month || !targetDistance) return alert('Lengkapi bulan dan target jarak')

    setLoading(true)
    const newGoal = { id: 'temp-' + Date.now(), month, target_distance: parseFloat(targetDistance) }
    setGoals(prev => [...prev, newGoal])
    setMonth('')
    setTargetDistance('')

    try {
      await API.post('/create/goals', { month, target_distance: newGoal.target_distance })
      fetchGoals()
    } catch {
      alert('Gagal tambah target')
      setGoals(prev => prev.filter(g => g.id !== newGoal.id))
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteGoal(id) {
    if (!confirm('Yakin ingin hapus target ini?')) return
    setLoading(true)
    try {
      await API.delete(`/delete/goals/${id}`)
      fetchGoals()
    } catch {
      alert('Gagal hapus target')
    } finally {
      setLoading(false)
    }
  }

  function formatMonth(monthStr) {
    if (!monthStr) return ''
    const [year, month] = monthStr.split('-')
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'agu', 'sep', 'okt', 'nov', 'des']
    return `${monthNames[parseInt(month, 10) -1]} ${year}`
  }

  return (
    <div style={{
      maxWidth: 420,
      margin: '40px auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: 20,
      backgroundColor: '#f7f5fb',
      borderRadius: 12,
      boxShadow: '0 4px 20px rgb(0 0 0 / 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#5a4a8f', marginBottom: 24 }}>target bulanan</h2>

      <form onSubmit={handleAddGoal} style={{
        display: 'flex',
        gap: 12,
        marginBottom: 24,
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          required
          style={{
            flexGrow: 1,
            minWidth: 130,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1.5px solid #ccc',
            fontSize: 16
          }}
        />
        <input
          type="number"
          placeholder="Target km"
          value={targetDistance}
          onChange={e => setTargetDistance(e.target.value)}
          required
          min={0}
          step="0.01"
          style={{
            width: 120,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1.5px solid #ccc',
            fontSize: 16
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 18px',
            backgroundColor: '#764ba2',
            border: 'none',
            borderRadius: 8,
            color: 'white',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: 16,
            minWidth: 100,
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => {
            if (!loading) e.currentTarget.style.backgroundColor = '#667eea'
          }}
          onMouseLeave={e => {
            if (!loading) e.currentTarget.style.backgroundColor = '#764ba2'
          }}
        >
          {loading ? 'Loading...' : 'Tambah'}
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {goals.length === 0 && (
          <li style={{ color: '#888', fontStyle: 'italic', textAlign: 'center' }}>tidak ada target</li>
        )}
        {goals.map(goal => (
          <li key={goal.id} style={{
            backgroundColor: 'white',
            padding: '12px 16px',
            marginBottom: 10,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgb(0 0 0 / 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 15,
            color: '#333'
          }}>
            <span><b>{formatMonth(goal.month)}</b> — {goal.target_distance} km</span>
            <button
              onClick={() => handleDeleteGoal(goal.id)}
              disabled={loading}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#e05a5a',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                fontSize: 14,
                padding: '4px 8px',
                borderRadius: 6
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#b00000'}
              onMouseLeave={e => e.currentTarget.style.color = '#e05a5a'}
            >
              hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
