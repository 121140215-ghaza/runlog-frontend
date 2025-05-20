import { useEffect, useState } from 'react'
import API from '../api'

export default function Goals() {
  const [goals, setGoals] = useState([])
  const [month, setMonth] = useState('')
  const [targetDistance, setTargetDistance] = useState('')
  const [loading, setLoading] = useState(false)

  // Load goals saat pertama kali mount
  useEffect(() => {
    fetchGoals()
  }, [])

  async function fetchGoals() {
    setLoading(true)
    try {
      const res = await API.get('/goals')
      setGoals(res.data)
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
    try {
      await API.post('/create/goals', { month, target_distance: parseFloat(targetDistance) })
      setMonth('')
      setTargetDistance('')
      fetchGoals()
    } catch {
      alert('Gagal tambah target')
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

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 40 }}>
      <h2>Target Bulanan</h2>

      <form onSubmit={handleAddGoal} style={{ marginBottom: 20 }}>
        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="number"
          placeholder="Target km"
          value={targetDistance}
          onChange={e => setTargetDistance(e.target.value)}
          required
          min={0}
          step="0.01"
          style={{ marginRight: 10 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Tambah'}
        </button>
      </form>

      <ul>
        {goals.map(goal => (
          <li key={goal.id} style={{ marginBottom: 8 }}>
            <b>{goal.month}</b> — {goal.target_distance} km
            <button
              onClick={() => handleDeleteGoal(goal.id)}
              disabled={loading}
              style={{ marginLeft: 10, color: 'red' }}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
