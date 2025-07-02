import { useEffect, useState } from 'react'
import api from '/services/api'

function PollList() {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/polls')
      .then(res => setPolls(res.data))
      .catch(err => console.error('Failed to fetch polls'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Polls</h2>
      {polls.length === 0 && <p>No polls yet.</p>}
      <ul>
        {polls.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default PollList
