import { useEffect, useState } from 'react'
import API from '../api'

export default function TestAPI() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Coba panggil API cek runlogs
    API.get('/cek/runlogs')
      .then(res => {
        setData(res.data)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
        setData(null)
      })
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h2>Test API - Get RunLogs</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!error && !data && <p>Loading...</p>}
      {data && (
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
